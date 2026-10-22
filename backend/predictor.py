import os

import cv2
import numpy as np
import torch
import rasterio

from model import SmallUNet


class ForestPredictor:

    def __init__(
        self,
        model_path="models/bluecarbon_unet.pth"
    ):

        self.device = torch.device(
            "cuda"
            if torch.cuda.is_available()
            else "cpu"
        )

        # Use the exact architecture used during training.
        self.model = SmallUNet()

        self.model.load_state_dict(
            torch.load(
                model_path,
                map_location=self.device
            )
        )

        self.model.to(self.device)

        self.model.eval()

        print(
            "Forest model loaded successfully"
        )

    # -----------------------------------------------------
    # LOAD NUMPY IMAGE
    # -----------------------------------------------------

    def load_npy(self, image_path):

        image = np.load(
            image_path
        )

        return image

    # -----------------------------------------------------
    # LOAD GEOTIFF IMAGE
    # -----------------------------------------------------

    def load_geotiff(self, image_path):

        with rasterio.open(
            image_path
        ) as src:

            image = src.read()

        return image

    # -----------------------------------------------------
    # LOAD IMAGE
    # -----------------------------------------------------

    def load_image(self, image_path):

        extension = os.path.splitext(
            image_path
        )[1].lower()

        if extension == ".npy":

            return self.load_npy(
                image_path
            )

        if extension in [
            ".tif",
            ".tiff"
        ]:

            return self.load_geotiff(
                image_path
            )

        raise ValueError(
            f"Unsupported image format: {extension}"
        )

    # -----------------------------------------------------
    # PREPROCESS
    # -----------------------------------------------------

    def preprocess(self, image):

        # Expected:
        #
        # (4, H, W)
        #
        # Band order:
        # B4 = Red
        # B3 = Green
        # B2 = Blue
        # B8 = NIR

        if image.ndim != 3:

            raise ValueError(
                "Expected image with shape (4, H, W)"
            )

        if image.shape[0] != 4:

            raise ValueError(
                "Expected exactly 4 bands"
            )

        # Convert to float32.

        image = image.astype(
            np.float32
        )

        # Normalize Sentinel-2 values.
        #
        # Training data was normalized
        # using /10000.

        image = image / 10000.0

        # Resize to the input size used
        # by the trained model.

        resized = np.zeros(
            (
                4,
                256,
                256
            ),
            dtype=np.float32
        )

        for band in range(4):

            resized[band] = cv2.resize(
                image[band],
                (
                    256,
                    256
                ),
                interpolation=cv2.INTER_LINEAR
            )

        return resized

    # -----------------------------------------------------
    # PREDICT
    # -----------------------------------------------------

    def predict(self, image_path):

        image = self.load_image(
            image_path
        )

        # Original dimensions.

        original_height = image.shape[1]
        original_width = image.shape[2]

        # Preprocess.

        processed = self.preprocess(
            image
        )

        # Convert to PyTorch tensor.

        tensor = torch.from_numpy(
            processed
        ).unsqueeze(0)

        tensor = tensor.to(
            self.device
        )

        # -------------------------------------------------
        # MODEL INFERENCE
        # -------------------------------------------------

        with torch.no_grad():

            output = self.model(
                tensor
            )

            probability = torch.sigmoid(
                output
            )

        # -------------------------------------------------
        # CREATE BINARY MASK
        # -------------------------------------------------

        mask = (
            probability
            .squeeze()
            .cpu()
            .numpy()
            > 0.5
        ).astype(
            np.uint8
        )

        # -------------------------------------------------
        # RESTORE ORIGINAL SIZE
        # -------------------------------------------------

        mask = cv2.resize(
            mask,
            (
                original_width,
                original_height
            ),
            interpolation=cv2.INTER_NEAREST
        )

        # -------------------------------------------------
        # FOREST COVERAGE
        # -------------------------------------------------

        forest_pixels = int(
            np.sum(mask > 0)
        )

        total_pixels = int(
            mask.size
        )

        forest_percentage = (
            forest_pixels /
            total_pixels
        ) * 100.0

        return {
            "forest_percentage": forest_percentage,
            "forest_pixels": forest_pixels,
            "total_pixels": total_pixels,
            "mask": mask
        }


# ---------------------------------------------------------
# TEST REAL GEE IMAGE
# ---------------------------------------------------------

if __name__ == "__main__":

    predictor = ForestPredictor()

    result = predictor.predict(
        "sentinel2_test.tif"
    )

    print("--------------------------------")
    print("GEE SATELLITE AI TEST")
    print("--------------------------------")

    print(
        "Forest Coverage:",
        round(
            result["forest_percentage"],
            2
        ),
        "%"
    )

    print(
        "Forest Pixels:",
        result["forest_pixels"]
    )

    print(
        "Total Pixels:",
        result["total_pixels"]
    )

    print(
        "Mask Shape:",
        result["mask"].shape
    )

    print("--------------------------------")