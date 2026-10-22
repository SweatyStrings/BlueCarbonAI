import json
import os

import cv2
import numpy as np
import rasterio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from predictor import ForestPredictor
from gee_service import download_sentinel_image


app = FastAPI(
    title="Blue Carbon X II",
    description="Forest and Carbon Analysis API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SATELLITE_DIRECTORY = "data/satellite"


SATELLITE_IMAGE_PATH = os.path.join(
    SATELLITE_DIRECTORY,
    "latest_sentinel2.tif"
)


SATELLITE_PREVIEW_PATH = os.path.join(
    SATELLITE_DIRECTORY,
    "latest_satellite_preview.png"
)


FOREST_OVERLAY_PATH = os.path.join(
    SATELLITE_DIRECTORY,
    "latest_forest_overlay.png"
)


os.makedirs(
    SATELLITE_DIRECTORY,
    exist_ok=True
)


predictor = ForestPredictor()


DEFAULT_BIOMASS_TONNES_PER_HECTARE = 100.0

CARBON_FRACTION = 0.47

CO2_TO_CARBON_RATIO = 44.0 / 12.0


DISPLAY_SIZE = 1024


@app.get("/")
def home():

    return {
        "message": "Blue Carbon X II API is running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


def normalize_band(band):
    """
    Normalize a Sentinel-2 band using
    percentile stretching.
    """

    band = band.astype(
        np.float32
    )

    lower = np.percentile(
        band,
        2
    )

    upper = np.percentile(
        band,
        98
    )

    if upper <= lower:

        return np.zeros_like(
            band,
            dtype=np.uint8
        )

    normalized = (
        (band - lower)
        /
        (upper - lower)
        *
        255.0
    )

    normalized = np.clip(
        normalized,
        0,
        255
    )

    return normalized.astype(
        np.uint8
    )


def improve_rgb_image(rgb):
    """
    Improve only the visual appearance
    of the satellite preview.

    This does NOT modify the image used
    by the AI model.
    """

    rgb = rgb.astype(
        np.float32
    ) / 255.0


    # Mild gamma correction.
    # Values below 1 brighten darker regions.
    gamma = 0.85

    rgb = np.power(
        rgb,
        gamma
    )


    rgb = (
        rgb * 255.0
    )

    rgb = np.clip(
        rgb,
        0,
        255
    ).astype(
        np.uint8
    )


    return rgb


def create_rgb_preview(
    image_path
):
    """
    Create an enhanced RGB preview
    from Sentinel-2 B4, B3 and B2.

    GEE band order:

    B4 -> Red
    B3 -> Green
    B2 -> Blue
    B8 -> NIR
    """

    with rasterio.open(
        image_path
    ) as src:

        image = src.read()


    red = normalize_band(
        image[0]
    )

    green = normalize_band(
        image[1]
    )

    blue = normalize_band(
        image[2]
    )


    rgb = np.stack(
        [
            red,
            green,
            blue
        ],
        axis=2
    )


    rgb = improve_rgb_image(
        rgb
    )


    # Smoothly enlarge the preview.
    rgb = cv2.resize(
        rgb,
        (
            DISPLAY_SIZE,
            DISPLAY_SIZE
        ),
        interpolation=cv2.INTER_CUBIC
    )


    bgr = cv2.cvtColor(
        rgb,
        cv2.COLOR_RGB2BGR
    )


    cv2.imwrite(
        SATELLITE_PREVIEW_PATH,
        bgr
    )


def create_forest_overlay(
    image_path,
    mask
):
    """
    Create an enhanced RGB satellite image
    with a translucent green forest mask.

    The mask itself is NOT modified for
    the actual analysis.
    """

    with rasterio.open(
        image_path
    ) as src:

        image = src.read()


    red = normalize_band(
        image[0]
    )

    green = normalize_band(
        image[1]
    )

    blue = normalize_band(
        image[2]
    )


    rgb = np.stack(
        [
            red,
            green,
            blue
        ],
        axis=2
    )


    rgb = improve_rgb_image(
        rgb
    )


    # Resize the satellite visualization.
    rgb = cv2.resize(
        rgb,
        (
            DISPLAY_SIZE,
            DISPLAY_SIZE
        ),
        interpolation=cv2.INTER_CUBIC
    )


    # Resize the AI mask for visualization only.
    mask_display = cv2.resize(
        mask.astype(np.uint8),
        (
            DISPLAY_SIZE,
            DISPLAY_SIZE
        ),
        interpolation=cv2.INTER_NEAREST
    )


    forest_mask = (
        mask_display > 0
    )


    # Green overlay color.
    forest_color = np.array(
        [
            40,
            210,
            70
        ],
        dtype=np.uint8
    )


    # Transparency of the forest overlay.
    alpha = 0.40


    overlay = rgb.copy()


    overlay[
        forest_mask
    ] = (
        rgb[
            forest_mask
        ] * (1.0 - alpha)
        +
        forest_color * alpha
    ).astype(
        np.uint8
    )


    bgr = cv2.cvtColor(
        overlay,
        cv2.COLOR_RGB2BGR
    )


    cv2.imwrite(
        FOREST_OVERLAY_PATH,
        bgr
    )


@app.get(
    "/satellite/preview"
)
def satellite_preview():

    if not os.path.exists(
        SATELLITE_PREVIEW_PATH
    ):

        return {
            "status": "error",
            "message": (
                "No satellite preview "
                "is available yet."
            )
        }


    return FileResponse(
        SATELLITE_PREVIEW_PATH,
        media_type="image/png"
    )


@app.get(
    "/satellite/forest-overlay"
)
def forest_overlay():

    if not os.path.exists(
        FOREST_OVERLAY_PATH
    ):

        return {
            "status": "error",
            "message": (
                "No forest overlay "
                "is available yet."
            )
        }


    return FileResponse(
        FOREST_OVERLAY_PATH,
        media_type="image/png"
    )


@app.post("/analyze")
def analyze(
    latitude: float,
    longitude: float,
    area_hectares: float,
    geometry: str
):

    if area_hectares <= 0:

        return {
            "status": "error",
            "message": (
                "area_hectares must be "
                "greater than zero."
            )
        }


    try:

        geometry_data = json.loads(
            geometry
        )

    except json.JSONDecodeError:

        return {
            "status": "error",
            "message": (
                "Invalid GeoJSON geometry."
            )
        }


    if not isinstance(
        geometry_data,
        dict
    ):

        return {
            "status": "error",
            "message": (
                "Geometry must be a JSON object."
            )
        }


    if geometry_data.get(
        "type"
    ) not in [
        "Polygon",
        "MultiPolygon"
    ]:

        return {
            "status": "error",
            "message": (
                "Only Polygon and MultiPolygon "
                "geometries are supported."
            )
        }


    try:

        # --------------------------------
        # GOOGLE EARTH ENGINE
        # --------------------------------

        satellite_result = (
            download_sentinel_image(
                geometry=geometry_data,
                latitude=latitude,
                longitude=longitude,
                area_hectares=area_hectares
            )
        )


        image_path = (
            satellite_result[
                "image_path"
            ]
        )


        # --------------------------------
        # CREATE SATELLITE PREVIEW
        # --------------------------------

        create_rgb_preview(
            image_path
        )


        # --------------------------------
        # AI FOREST PREDICTION
        # --------------------------------

        prediction = predictor.predict(
            image_path
        )


        forest_percentage = float(
            prediction[
                "forest_percentage"
            ]
        )


        forest_pixels = int(
            prediction[
                "forest_pixels"
            ]
        )


        total_pixels = int(
            prediction[
                "total_pixels"
            ]
        )


        mask = prediction[
            "mask"
        ]


        # --------------------------------
        # CREATE AI FOREST OVERLAY
        # --------------------------------

        create_forest_overlay(
            image_path,
            mask
        )


        # --------------------------------
        # FOREST AREA
        # --------------------------------

        forest_area_hectares = (
            area_hectares
            * forest_percentage
            / 100.0
        )


        # --------------------------------
        # BIOMASS
        # --------------------------------

        biomass_tonnes = (
            forest_area_hectares
            * DEFAULT_BIOMASS_TONNES_PER_HECTARE
        )


        # --------------------------------
        # CARBON
        # --------------------------------

        carbon_tonnes = (
            biomass_tonnes
            * CARBON_FRACTION
        )


        # --------------------------------
        # CO2 EQUIVALENT
        # --------------------------------

        co2e_tonnes = (
            carbon_tonnes
            * CO2_TO_CARBON_RATIO
        )


        # --------------------------------
        # POTENTIAL CREDITS
        # --------------------------------

        potential_credits = (
            co2e_tonnes
        )


        # --------------------------------
        # RESPONSE
        # --------------------------------

        return {

            "status": "success",


            "location": {

                "latitude": latitude,

                "longitude": longitude

            },


            "area": {

                "selected_area_hectares": round(
                    area_hectares,
                    4
                ),

                "forest_area_hectares": round(
                    forest_area_hectares,
                    4
                )

            },


            "satellite": {

                "source": (
                    "Google Earth Engine "
                    "Sentinel-2 SR Harmonized"
                ),

                "image_id": (
                    satellite_result[
                        "image_id"
                    ]
                ),

                "cloud_percentage": (
                    satellite_result[
                        "cloud_percentage"
                    ]
                ),

                "images_found": (
                    satellite_result[
                        "images_found"
                    ]
                ),

                "bands": (
                    satellite_result[
                        "bands"
                    ]
                ),

                "preview_url": (
                    "/satellite/preview"
                ),

                "forest_overlay_url": (
                    "/satellite/forest-overlay"
                )

            },


            "analysis": {

                "forest_coverage_percentage": round(
                    forest_percentage,
                    2
                ),

                "forest_pixels": forest_pixels,

                "total_pixels": total_pixels

            },


            "biomass": {

                "biomass_density_tonnes_per_hectare": (
                    DEFAULT_BIOMASS_TONNES_PER_HECTARE
                ),

                "estimated_biomass_tonnes": round(
                    biomass_tonnes,
                    4
                )

            },


            "carbon": {

                "carbon_fraction": (
                    CARBON_FRACTION
                ),

                "estimated_carbon_tonnes": round(
                    carbon_tonnes,
                    4
                )

            },


            "co2e": {

                "estimated_co2e_tonnes": round(
                    co2e_tonnes,
                    4
                )

            },


            "credits": {

                "estimated_potential_credits": round(
                    potential_credits,
                    4
                ),

                "credit_unit": "tCO2e",

                "verified": False

            },


            "assumptions": {

                "biomass_density_tonnes_per_hectare": (
                    DEFAULT_BIOMASS_TONNES_PER_HECTARE
                ),

                "carbon_fraction": (
                    CARBON_FRACTION
                ),

                "co2_conversion_ratio": (
                    CO2_TO_CARBON_RATIO
                ),

                "note": (
                    "Biomass, carbon, CO2e and "
                    "potential-credit values are "
                    "prototype estimates based on "
                    "the configured assumptions. "
                    "They are not verified carbon "
                    "credits."
                )

            }

        }


    except Exception as error:

        print(
            "Analysis error:",
            str(error)
        )


        return {
            "status": "error",
            "message": str(error)
        }