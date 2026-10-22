import rasterio
import numpy as np


# ---------------------------------------------------------
# SATELLITE IMAGE
# ---------------------------------------------------------

image_path = "sentinel2_test.tif"


# ---------------------------------------------------------
# OPEN IMAGE
# ---------------------------------------------------------

with rasterio.open(image_path) as src:

    image = src.read()

    print("--------------------------------")
    print("SENTINEL-2 IMAGE INSPECTION")
    print("--------------------------------")

    print("Number of bands:", src.count)

    print(
        "Image shape:",
        image.shape
    )

    print(
        "Width:",
        src.width
    )

    print(
        "Height:",
        src.height
    )

    print(
        "Data type:",
        image.dtype
    )

    print(
        "CRS:",
        src.crs
    )

    print(
        "Resolution:",
        src.res
    )

    print("--------------------------------")
    print("BAND INFORMATION")
    print("--------------------------------")

    for index in range(src.count):

        band = image[index]

        print(
            f"Band {index + 1}:"
        )

        print(
            "  Minimum:",
            band.min()
        )

        print(
            "  Maximum:",
            band.max()
        )

        print(
            "  Mean:",
            round(
                float(band.mean()),
                2
            )
        )

        print(
            "  Data type:",
            band.dtype
        )

    print("--------------------------------")

    # Check for invalid values.

    print(
        "NaN values:",
        np.isnan(image).sum()
    )

    print(
        "Zero pixels:",
        np.sum(image == 0)
    )

    print("--------------------------------")
    