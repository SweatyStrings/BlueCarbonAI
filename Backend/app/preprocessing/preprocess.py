import cv2
import numpy as np
import rasterio
import torch


class ImagePreprocessor:

    def load_image(self, image_path):

        with rasterio.open(image_path) as src:
            image = src.read([1, 2, 3])

        image = np.transpose(image, (1, 2, 0))

        return image

            

    def resize(self, image, size=(512, 512)):
        """
        Resize image to the model input size.
        """

        return cv2.resize(image, size)

    def normalize(self, image):

        image = image.astype(np.float32)

        if image.max() > 0:
            image = image / image.max()

        return image

    def to_tensor(self, image):
        """
        Convert NumPy array to PyTorch tensor.
        """

        tensor = torch.from_numpy(image)

        tensor = tensor.permute(2, 0, 1)

        tensor = tensor.unsqueeze(0)

        return tensor.float()

    def preprocess(self, image_path):

        image = self.load_image(image_path)

        image = self.resize(image)

        image = self.normalize(image)

        tensor = self.to_tensor(image)

        return image, tensor