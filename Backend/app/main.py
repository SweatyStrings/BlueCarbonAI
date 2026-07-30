from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes import carbon
from app.routes import analyze

app = FastAPI(
    title="BlueCarbonAI Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

app.include_router(carbon.router)
app.include_router(analyze.router)

@app.get("/")
def home():
    return {
        "message": "BlueCarbonAI API Running"
    }