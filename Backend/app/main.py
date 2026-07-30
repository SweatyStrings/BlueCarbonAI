from fastapi import FastAPI

from app.routes import carbon

app = FastAPI(
    title="BlueCarbonAI Backend"
)

app.include_router(carbon.router)


@app.get("/")
def home():
    return {
        "message": "BlueCarbonAI API Running"
    }