from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal

app = FastAPI(
    title="TechPulse API",
    description="API for discovering student opportunities",
    version="0.2.0",
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

opportunities = [
    {
        "id": 1,
        "title": "AI Innovation Hackathon",
        "organization": "TechPulse Demo",
        "category": "Hackathon",
        "description": "Build an innovative AI-based project.",
        "mode": "Online",
        "location": "Online",
        "deadline": "2026-11-15",
        "sourceUrl": None,
        "tags": ["AI", "Python", "Machine Learning"],
        "isSample": True,
    },
    {
        "id": 2,
        "title": "Frontend Developer Internship",
        "organization": "TechPulse Demo",
        "category": "Internship",
        "description": "Learn frontend development by building web applications.",
        "mode": "Hybrid",
        "location": "India",
        "deadline": "2026-11-20",
        "sourceUrl": None,
        "tags": ["React", "JavaScript", "CSS"],
        "isSample": True,
    },
    {
        "id": 3,
        "title": "Python Developer - Fresher",
        "organization": "TechPulse Demo",
        "category": "Job",
        "description": "An entry-level opportunity for Python developers.",
        "mode": "Offline",
        "location": "Ghaziabad",
        "deadline": "2026-11-25",
        "sourceUrl": None,
        "tags": ["Python", "FastAPI", "SQL"],
        "isSample": True,
    },
]


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
    results = opportunities

    if search.strip():
        keyword = search.strip().lower()
        results = [
            item for item in results
            if keyword in item["title"].lower()
            or keyword in item["organization"].lower()
            or keyword in item["description"].lower()
            or any(keyword in tag.lower() for tag in item["tags"])
        ]

    if category:
        results = [
            item for item in results
            if item["category"] == category
        ]

    return {
        "count": len(results),
        "results": results,
    }