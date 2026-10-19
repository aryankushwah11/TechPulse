
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
