
import json
import sqlite3
from pathlib import Path

DATABASE_PATH = Path(__file__).resolve().parent / "techpulse.db"

DEMO_OPPORTUNITIES = [
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


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS opportunities (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                organization TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                mode TEXT NOT NULL,
                location TEXT NOT NULL,
                deadline TEXT,
                sourceUrl TEXT,
                tags TEXT NOT NULL,
                isSample INTEGER NOT NULL DEFAULT 1
            )
        """)

        for item in DEMO_OPPORTUNITIES:
            connection.execute("""
                INSERT OR IGNORE INTO opportunities (
                    id, title, organization, category, description,
                    mode, location, deadline, sourceUrl, tags, isSample
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                item["id"],
                item["title"],
                item["organization"],
                item["category"],
                item["description"],
                item["mode"],
                item["location"],
                item["deadline"],
                item["sourceUrl"],
                json.dumps(item["tags"]),
                int(item["isSample"]),
            ))

        connection.commit()
