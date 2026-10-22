import json
from contextlib import asynccontextmanager
from datetime import date
from typing import Literal

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, HttpUrl

from backend.database import get_connection, init_db


Category = Literal["Hackathon", "Internship", "Job", "Event", "Workshop"]
Mode = Literal["Online", "Offline", "Hybrid"]


class OpportunityCreate(BaseModel):
    title: str = Field(min_length=3, max_length=150)
    organization: str = Field(min_length=2, max_length=100)
    category: Category
    description: str = Field(min_length=10, max_length=2000)
    mode: Mode
    location: str = Field(min_length=2, max_length=150)
    deadline: date | None = None
    sourceUrl: HttpUrl | None = None
    tags: list[str] = Field(min_length=1, max_length=15)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="TechPulse API",
    description="API for discovering student opportunities",
    version="0.6.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to TechPulse API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/opportunities")
def get_opportunities(
    search: str = Query(default="", description="Search opportunities"),
    category: Category | None = None,
):
    with get_connection() as connection:
        query = "SELECT * FROM opportunities"
        conditions = []
        values = []

        if search.strip():
            keyword = f"%{search.strip()}%"
            conditions.append("""
                (
                    title LIKE ?
                    OR organization LIKE ?
                    OR description LIKE ?
                    OR tags LIKE ?
                    OR location LIKE ?
                )
            """)
            values.extend([keyword] * 5)

        if category:
            conditions.append("category = ?")
            values.append(category)

        conditions.append("(deadline IS NULL OR deadline >= ?)")
        values.append(date.today().isoformat())

        query += " WHERE " + " AND ".join(conditions)
        query += " ORDER BY id"

        rows = connection.execute(query, values).fetchall()

        results = []
        for row in rows:
            item = dict(row)
            item["tags"] = json.loads(item["tags"])
            item["isSample"] = bool(item["isSample"])
            item["lastVerified"] = date.today().isoformat()
            results.append(item)

    return {"count": len(results), "results": results}


@app.post("/opportunities", status_code=201)
def create_opportunity(opportunity: OpportunityCreate):
    data = opportunity.model_dump()

    data["title"] = data["title"].strip()
    data["organization"] = data["organization"].strip()

    with get_connection() as connection:
        existing = connection.execute(
            """
            SELECT id
            FROM opportunities
            WHERE LOWER(TRIM(title)) = LOWER(?)
            AND LOWER(TRIM(organization)) = LOWER(?)
            """,
            (data["title"], data["organization"]),
        ).fetchone()

        if existing:
            raise HTTPException(
                status_code=409,
                detail="An opportunity with this title and organization already exists.",
            )

        source_url = data["sourceUrl"]
        if source_url is not None:
            data["sourceUrl"] = str(source_url)

        if data["deadline"] is not None:
            data["deadline"] = data["deadline"].isoformat()

        data["tags"] = json.dumps(data["tags"])

        cursor = connection.execute(
            """
            INSERT INTO opportunities (
                title, organization, category, description,
                mode, location, deadline, sourceUrl, tags, isSample
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
            """,
            (
                data["title"],
                data["organization"],
                data["category"],
                data["description"],
                data["mode"],
                data["location"],
                data["deadline"],
                data["sourceUrl"],
                data["tags"],
            ),
        )

        opportunity_id = cursor.lastrowid

        row = connection.execute(
            "SELECT * FROM opportunities WHERE id = ?",
            (opportunity_id,),
        ).fetchone()

        result = dict(row)
        result["tags"] = json.loads(result["tags"])
        result["isSample"] = bool(result["isSample"])
        result["lastVerified"] = date.today().isoformat()

    return result