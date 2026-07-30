from fastapi import APIRouter

from app.models.request_models import EstimateRequest
from app.services.analysis_service import AnalysisService

router = APIRouter(prefix="/analyze", tags=["Analysis"])


@router.post("/")
def analyze(request: EstimateRequest):

    service = AnalysisService()

    return service.run(
        latitude=request.latitude,
        longitude=request.longitude,
        buffer_meters=request.buffer_meters,
        ecosystem=request.ecosystem,
    )