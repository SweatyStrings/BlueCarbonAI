from fastapi import APIRouter, HTTPException
from app.models.response_models import EstimateResponse

from app.models.request_models import EstimateRequest
from app.services.analysis_service import AnalysisService
from app.utils.exceptions import (
    SatelliteImageNotFound,
    InvalidEcosystemError,
)

router = APIRouter(
    prefix="/carbon",
    tags=["Carbon"],
)

analysis = AnalysisService()


@router.post(
    "/estimate",
    response_model=EstimateResponse
)
def estimate(request: EstimateRequest):

    try:

        return analysis.run(
            latitude=request.latitude,
            longitude=request.longitude,
            buffer_meters=request.buffer_meters,
            ecosystem=request.ecosystem,
        )

    except SatelliteImageNotFound as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except InvalidEcosystemError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}",
        )