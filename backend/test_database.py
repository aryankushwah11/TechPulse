
from backend import database


def test_init_db_creates_and_seeds_opportunities(tmp_path, monkeypatch):
    monkeypatch.setattr(
        database,
        "DATABASE_PATH",
        tmp_path / "test_techpulse.db",
    )

    database.init_db()

    with database.get_connection() as connection:
        rows = connection.execute(
            "SELECT * FROM opportunities ORDER BY id"
        ).fetchall()

    assert len(rows) == 3
    assert rows[0]["title"] == "AI Innovation Hackathon"


def test_init_db_does_not_duplicate_opportunities(tmp_path, monkeypatch):
    monkeypatch.setattr(
        database,
        "DATABASE_PATH",
        tmp_path / "test_techpulse.db",
    )

    database.init_db()
    database.init_db()

    with database.get_connection() as connection:
        count = connection.execute(
            "SELECT COUNT(*) FROM opportunities"
        ).fetchone()[0]

    assert count == 3
