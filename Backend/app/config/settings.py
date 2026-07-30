from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    APP_NAME = os.getenv("APP_NAME", "BlueCarbonAI")
    APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
    GEE_PROJECT_ID = os.getenv("GEE_PROJECT_ID")


settings = Settings()