
import json
from contextlib import asynccontextmanager
from datetime import date
from typing import Literal

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from backend.database import get_connection, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="TechPulse API",
    description="API for discovering student opportunities",
    version="0.3.0",
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
    category: Literal[
        "Hackathon", "Internship", "Job", "Event", "Workshop"
    ] | None = None,
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

        if conditions:
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

    return {
        "count": len(results),
        "results": results,
    }
