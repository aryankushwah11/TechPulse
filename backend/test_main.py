
from datetime import date, timedelta
from uuid import uuid4

from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_get_all_opportunities():
    response = client.get("/opportunities")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == len(data["results"])
    assert data["count"] >= 3


def test_search_python():
    response = client.get("/opportunities?search=Python")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 2


def test_filter_hackathons():
    response = client.get("/opportunities?category=Hackathon")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 1
    assert all(
        item["category"] == "Hackathon"
        for item in data["results"]
    )


def test_search_with_no_results():
    response = client.get("/opportunities?search=nonexistentxyz")
    assert response.status_code == 200
    assert response.json()["count"] == 0


def test_duplicate_opportunity_returns_conflict():
    payload = {
        "title": "AI Innovation Hackathon",
        "organization": "TechPulse Demo",
        "category": "Hackathon",
        "description": "Build an innovative AI-based project.",
        "mode": "Online",
        "location": "Online",
        "deadline": "2026-11-15",
        "sourceUrl": None,
        "tags": ["AI", "Python"],
    }

    response = client.post("/opportunities", json=payload)

    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]


def test_expired_opportunity_is_not_returned():
    expired_date = (date.today() - timedelta(days=1)).isoformat()
    unique_id = uuid4().hex

    title = f"Expired Testing Opportunity {unique_id}"
    organization = f"Expiry Test Company {unique_id}"

    payload = {
        "title": title,
        "organization": organization,
        "category": "Internship",
        "description": "This opportunity is used to test expired deadlines.",
        "mode": "Online",
        "location": "India",
        "deadline": expired_date,
        "sourceUrl": None,
        "tags": ["Testing", "Python"],
    }

    create_response = client.post("/opportunities", json=payload)
    assert create_response.status_code == 201

    response = client.get(
        "/opportunities",
        params={"search": title},
    )

    assert response.status_code == 200
    assert response.json()["count"] == 0
