from fastapi import FastAPI

app = FastAPI(
    title="TechPulse API",
    description="API for discovering student opportunities",
    version="0.1.0",
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