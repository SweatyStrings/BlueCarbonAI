import os
import requests
import ee
from app.config.settings import settings
from app.utils.exceptions import SatelliteImageNotFound


class GEEService:

    def __init__(self):
        self.initialized = False

    def initialize(self):
        if not self.initialized:
            ee.Initialize(project=settings.GEE_PROJECT_ID)
            self.initialized = True
            print("✅ Google Earth Engine initialized.")

    def test_connection(self):
        number = ee.Number(10).multiply(5)
        print("Connection Test:", number.getInfo())

    def get_satellite_image(
        self,
        latitude,
        longitude,
        buffer_meters=1000,
        start_date="2024-01-01",
        end_date="2024-12-31",
        max_cloud=30,
    ):

        point = ee.Geometry.Point([longitude, latitude])
        aoi = point.buffer(buffer_meters).bounds()

        collection = (
            ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
            .filterBounds(aoi)
            .filterDate(start_date, end_date)
            .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", max_cloud))
            .sort("CLOUDY_PIXEL_PERCENTAGE")
        )

        if collection.size().getInfo() == 0:
            raise SatelliteImageNotFound(
                "No Sentinel-2 image found for this location."
            )

        image = collection.first()

        return image, aoi

    def download_satellite_image(
        self,
        image,
        aoi,
        output_path="outputs/satellite.tif"
    ):
        """
        Downloads only the RGB bands (B4, B3, B2)
        """

        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        multiband_image = image.select(["B4", "B3", "B2", "B8"])

        url = multiband_image.clip(aoi).getDownloadURL({
            "scale": 10,
            "region": aoi,
            "format": "GEO_TIFF"
        })

        print("Downloading satellite image...")

        response = requests.get(url)

        if response.status_code == 200:

            with open(output_path, "wb") as f:
                f.write(response.content)

            print(f"✅ Saved to {output_path}")

        else:
            raise Exception("Download failed.") 