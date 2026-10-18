
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
    assert data["count"] == 3
    assert len(data["results"]) == 3


def test_search_python():
    response = client.get("/opportunities?search=Python")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 2


def test_filter_hackathons():
    response = client.get("/opportunities?category=Hackathon")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 1
    assert data["results"][0]["category"] == "Hackathon"


def test_search_with_no_results():
    response = client.get("/opportunities?search=nonexistentxyz")
    assert response.status_code == 200
    assert response.json()["count"] == 0
