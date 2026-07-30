import numpy as np


class NDVIProcessor:

    def calculate_ndvi(self, red, nir):
        """
        NDVI = (NIR - RED) / (NIR + RED)
        """

        denominator = nir + red

        denominator[denominator == 0] = 1

        ndvi = (nir - red) / denominator

        return ndvi

    def vegetation_mask(self, ndvi, threshold=0.3):
        """
        Generates a binary vegetation mask.
        """

        return (ndvi > threshold).astype(np.uint8)