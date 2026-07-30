import numpy as np


class AreaCalculator:
    """
    Calculates vegetation area from a binary vegetation mask.
    """

    def __init__(self, pixel_resolution=10):
        # Sentinel-2: 10 meters per pixel
        self.pixel_resolution = pixel_resolution
        self.pixel_area = pixel_resolution * pixel_resolution

    def calculate(self, mask):
        """
        Calculates vegetation area.

        Returns:
            dict
        """

        vegetation_pixels = np.count_nonzero(mask)

        area_m2 = vegetation_pixels * self.pixel_area
        area_hectares = area_m2 / 10000
        area_km2 = area_m2 / 1_000_000

        vegetation_pixels = int(vegetation_pixels)
        area_m2 = float(area_m2)
        area_hectares = float(area_hectares)
        area_km2 = float(area_km2)

        return {
        "vegetation_pixels": vegetation_pixels,
        "area_m2": round(area_m2, 2),
        "area_hectares": round(area_hectares, 4),
        "area_km2": round(area_km2, 6),
    }

