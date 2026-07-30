from app.services.gee_service import GEEService
from app.services.image_service import ImageService
from app.preprocessing.ndvi import NDVIProcessor
from app.postprocessing.clean_mask import MaskCleaner
from app.postprocessing.area_calculator import AreaCalculator
from app.services.carbon_service import CarbonEstimator
from app.utils.visualization import Visualization


class AnalysisService:
    """
    Runs the complete BlueCarbonAI analysis pipeline.
    """

    def __init__(self):

        self.gee = GEEService()
        self.image_service = ImageService()

        self.ndvi = NDVIProcessor()

        self.cleaner = MaskCleaner()

        self.area = AreaCalculator()

        self.carbon = CarbonEstimator()

        self.visualization = Visualization()

    def run(
        self,
        latitude: float,
        longitude: float,
        buffer_meters: int,
        ecosystem: str,
    ):

        # -----------------------------
        # Google Earth Engine
        # -----------------------------

        self.gee.initialize()

        image, aoi = self.gee.get_satellite_image(
            latitude=latitude,
            longitude=longitude,
            buffer_meters=buffer_meters,
        )

        self.gee.download_satellite_image(image, aoi)

        # -----------------------------
        # Image Loading
        # -----------------------------

        image = self.image_service.load_multiband_image(
            "outputs/satellite.tif"
        )

        rgb = self.image_service.get_rgb(image)

        red = self.image_service.get_red(image)

        nir = self.image_service.get_nir(image)

        # -----------------------------
        # NDVI
        # -----------------------------

        ndvi = self.ndvi.calculate_ndvi(red, nir)

        raw_mask = self.ndvi.vegetation_mask(ndvi)

        # -----------------------------
        # Clean Mask
        # -----------------------------

        clean_mask = self.cleaner.clean(raw_mask)

        # -----------------------------
        # Save Outputs
        # -----------------------------

        self.visualization.save_mask(clean_mask)

        self.visualization.create_overlay(
            rgb,
            clean_mask,
        )

        # -----------------------------
        # Area
        # -----------------------------

        stats = self.area.calculate(clean_mask)

        # -----------------------------
        # Carbon
        # -----------------------------

        carbon = self.carbon.estimate(
            area_hectares=stats["area_hectares"],
            ecosystem=ecosystem,
        )

        return {
        "vegetation": stats,
        "carbon": carbon,

        "satellite_image": "http://127.0.0.1:8000/outputs/satellite.tif",
        "mask_image": "http://127.0.0.1:8000/outputs/mask.png",
        "overlay_image": "http://127.0.0.1:8000/outputs/overlay.png",
    }
    
