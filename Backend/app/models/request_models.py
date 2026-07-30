from pydantic import BaseModel


class EstimateRequest(BaseModel):
    latitude: float
    longitude: float
    buffer_meters: int = 1000
    ecosystem: str