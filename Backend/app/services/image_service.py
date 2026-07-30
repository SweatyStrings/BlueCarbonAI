import rasterio
import numpy as np


class ImageService:

    def load_multiband_image(self, image_path):
        """
        Loads B4, B3, B2, B8 from Sentinel-2 GeoTIFF.
        """

        with rasterio.open(image_path) as src:
            image = src.read([1, 2, 3, 4])

        return image

    def get_rgb(self, image):
        """
        Returns RGB image for visualization.
        """

        rgb = np.transpose(image[:3], (1, 2, 0))

        return rgb

    def get_red(self, image):

        return image[0].astype(np.float32)

    def get_nir(self, image):

        return image[3].astype(np.float32)