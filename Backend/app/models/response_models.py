from pydantic import BaseModel


class VegetationResponse(BaseModel):
    vegetation_pixels: int
    area_m2: float
    area_hectares: float
    area_km2: float


class CarbonResponse(BaseModel):
    ecosystem: str
    area_hectares: float
    carbon_density: int
    carbon_tonnes: float
    co2_equivalent_tonnes: float


class EstimateResponse(BaseModel):
    vegetation: VegetationResponse
    carbon: CarbonResponse

    satellite_image: str
    mask_image: str
    overlay_image: str