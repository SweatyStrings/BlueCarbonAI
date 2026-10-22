import os
import requests
import ee


# ---------------------------------------------------------
# GOOGLE EARTH ENGINE CONFIGURATION
# ---------------------------------------------------------

GEE_PROJECT = "bluecarbonx-501114"

OUTPUT_DIRECTORY = "data/satellite"


# ---------------------------------------------------------
# INITIALIZE EARTH ENGINE
# ---------------------------------------------------------

ee.Initialize(
    project=GEE_PROJECT
)


# ---------------------------------------------------------
# CREATE OUTPUT DIRECTORY
# ---------------------------------------------------------

os.makedirs(
    OUTPUT_DIRECTORY,
    exist_ok=True
)


# ---------------------------------------------------------
# CREATE GEE GEOMETRY
# ---------------------------------------------------------

def create_gee_geometry(
    geometry
):
    """
    Convert GeoJSON geometry from the frontend
    into a Google Earth Engine geometry.
    """

    if not geometry:
        raise ValueError(
            "Geometry is required."
        )

    geometry_type = geometry.get(
        "type"
    )

    coordinates = geometry.get(
        "coordinates"
    )

    if not geometry_type:
        raise ValueError(
            "Geometry type is missing."
        )

    if not coordinates:
        raise ValueError(
            "Geometry coordinates are missing."
        )

    if geometry_type == "Polygon":

        return ee.Geometry.Polygon(
            coordinates
        )

    elif geometry_type == "MultiPolygon":

        return ee.Geometry.MultiPolygon(
            coordinates
        )

    else:

        raise ValueError(
            f"Unsupported geometry type: "
            f"{geometry_type}"
        )


# ---------------------------------------------------------
# FIND SENTINEL-2 IMAGE
# ---------------------------------------------------------

def find_sentinel_image(
    geometry,
    start_date="2025-01-01",
    end_date="2025-12-31",
    max_cloud_percentage=20
):
    """
    Find the least-cloudy Sentinel-2 image
    covering the selected geometry.
    """

    collection = (
        ee.ImageCollection(
            "COPERNICUS/S2_SR_HARMONIZED"
        )
        .filterBounds(
            geometry
        )
        .filterDate(
            start_date,
            end_date
        )
        .filter(
            ee.Filter.lt(
                "CLOUDY_PIXEL_PERCENTAGE",
                max_cloud_percentage
            )
        )
        .sort(
            "CLOUDY_PIXEL_PERCENTAGE"
        )
    )

    count = collection.size().getInfo()

    if count == 0:

        raise ValueError(
            "No suitable Sentinel-2 image "
            "found for the selected area."
        )

    image = collection.first()

    image_id = image.id().getInfo()

    cloud_percentage = image.get(
        "CLOUDY_PIXEL_PERCENTAGE"
    ).getInfo()

    return (
        image,
        image_id,
        cloud_percentage,
        count
    )


# ---------------------------------------------------------
# DOWNLOAD SENTINEL-2 IMAGE
# ---------------------------------------------------------

def download_sentinel_image(
    geometry,
    latitude,
    longitude,
    area_hectares
):
    """
    Download Sentinel-2 B4, B3, B2 and B8
    for the exact geometry selected by the user.

    Returns:
        Dictionary containing satellite information
        and local GeoTIFF path.
    """

    if area_hectares <= 0:

        raise ValueError(
            "Area must be greater than zero."
        )

    # -----------------------------------------------------
    # CONVERT FRONTEND GEOMETRY
    # -----------------------------------------------------

    region = create_gee_geometry(
        geometry
    )

    # -----------------------------------------------------
    # FIND BEST SENTINEL-2 IMAGE
    # -----------------------------------------------------

    (
        image,
        image_id,
        cloud_percentage,
        image_count
    ) = find_sentinel_image(
        region
    )

    # -----------------------------------------------------
    # SELECT MODEL BANDS
    # -----------------------------------------------------

    image = image.select([
        "B4",
        "B3",
        "B2",
        "B8"
    ])

    # -----------------------------------------------------
    # DOWNLOAD IMAGE
    # -----------------------------------------------------

    download_url = image.getDownloadURL({
        "region": region,
        "dimensions": "512x512",
        "format": "GEO_TIFF"
    })

    print(
        "Downloading Sentinel-2 image..."
    )

    response = requests.get(
        download_url,
        timeout=120
    )

    response.raise_for_status()

    # -----------------------------------------------------
    # SAVE FILE
    # -----------------------------------------------------

    output_path = os.path.join(
        OUTPUT_DIRECTORY,
        "latest_sentinel2.tif"
    )

    with open(
        output_path,
        "wb"
    ) as file:

        file.write(
            response.content
        )

    # -----------------------------------------------------
    # RETURN INFORMATION
    # -----------------------------------------------------

    return {

        "image_path": output_path,

        "image_id": image_id,

        "cloud_percentage": (
            cloud_percentage
        ),

        "images_found": (
            image_count
        ),

        "bands": [
            "B4",
            "B3",
            "B2",
            "B8"
        ],

        "source": (
            "Google Earth Engine "
            "Sentinel-2 SR Harmonized"
        ),

        "latitude": latitude,

        "longitude": longitude,

        "area_hectares": area_hectares

    }


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    print(
        "--------------------------------"
    )

    print(
        "GOOGLE EARTH ENGINE SERVICE TEST"
    )

    print(
        "--------------------------------"
    )

    # Example polygon.

    test_geometry = {

        "type": "Polygon",

        "coordinates": [[

            [
                77.6700,
                13.0900
            ],

            [
                77.6800,
                13.0900
            ],

            [
                77.6800,
                13.1000
            ],

            [
                77.6700,
                13.1000
            ],

            [
                77.6700,
                13.0900
            ]

        ]]

    }

    result = download_sentinel_image(

        geometry=test_geometry,

        latitude=13.095,

        longitude=77.675,

        area_hectares=1.2

    )

    print(
        "Image ID:",
        result["image_id"]
    )

    print(
        "Cloud Percentage:",
        result["cloud_percentage"]
    )

    print(
        "Images Found:",
        result["images_found"]
    )

    print(
        "Image Path:",
        result["image_path"]
    )

    print(
        "Area:",
        result["area_hectares"],
        "ha"
    )

    print(
        "--------------------------------"
    )

    print(
        "GEE SERVICE TEST SUCCESSFUL"
    )

    print(
        "--------------------------------"
    )