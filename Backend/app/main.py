from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import carbon
from app.routes import analyze

app = FastAPI(
    title="BlueCarbonAI Backend"
)

# Allow React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing route
app.include_router(carbon.router)

# New analysis route
app.include_router(analyze.router)


@app.get("/")
def home():
    return {
        "message": "BlueCarbonAI API Running"
    }