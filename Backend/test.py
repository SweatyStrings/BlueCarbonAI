from app.services.image_service import ImageService
from app.preprocessing.ndvi import NDVIProcessor
from app.postprocessing.clean_mask import MaskCleaner
from app.postprocessing.area_calculator import AreaCalculator
from app.services.carbon_service import CarbonEstimator
from app.utils.visualization import Visualization


def main():

    print("\n========== BlueCarbonAI Pipeline ==========\n")

    # -----------------------------
    # Load Satellite Image
    # -----------------------------
    image_service = ImageService()

    image = image_service.load_multiband_image(
        "outputs/satellite.tif"
    )

    rgb = image_service.get_rgb(image)

    red = image_service.get_red(image)
    nir = image_service.get_nir(image)

    print("✅ Satellite image loaded")

    # -----------------------------
    # NDVI
    # -----------------------------
    ndvi_processor = NDVIProcessor()

    ndvi = ndvi_processor.calculate_ndvi(red, nir)

    raw_mask = ndvi_processor.vegetation_mask(ndvi)

    print("✅ NDVI calculated")

    # -----------------------------
    # Clean Mask
    # -----------------------------
    cleaner = MaskCleaner()

    clean_mask = cleaner.clean(raw_mask)

    print("✅ Vegetation mask cleaned")

    # -----------------------------
    # Save Images
    # -----------------------------
    visualization = Visualization()

    visualization.save_mask(clean_mask)

    visualization.create_overlay(
        rgb,
        clean_mask
    )

    print("✅ Visualization created")

    # -----------------------------
    # Area Calculation
    # -----------------------------
    calculator = AreaCalculator()

    stats = calculator.calculate(clean_mask)

    print("\n===== Vegetation Statistics =====")

    for key, value in stats.items():
        print(f"{key}: {value}")

    # -----------------------------
    # Carbon Estimation
    # -----------------------------
    estimator = CarbonEstimator()

    carbon = estimator.estimate(
        area_hectares=stats["area_hectares"],
        ecosystem="mangrove"
    )

    print("\n===== Carbon Estimate =====")

    for key, value in carbon.items():
        print(f"{key}: {value}")

    print("\n========== Pipeline Complete ==========\n")


if __name__ == "__main__":
    main()