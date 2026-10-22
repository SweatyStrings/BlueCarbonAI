import ee
import requests
import zipfile
import io
import os


# ---------------------------------------------------------
# INITIALIZE GOOGLE EARTH ENGINE
# ---------------------------------------------------------

ee.Initialize(
    project="bluecarbonx-501114"
)


# ---------------------------------------------------------
# TEST LOCATION
# ---------------------------------------------------------

latitude = 13.096358
longitude = 77.676546


point = ee.Geometry.Point([
    longitude,
    latitude
])


# Create an area around the selected location.
region = point.buffer(1000).bounds()


# ---------------------------------------------------------
# FIND SENTINEL-2 IMAGE
# ---------------------------------------------------------

collection = (
    ee.ImageCollection(
        "COPERNICUS/S2_SR_HARMONIZED"
    )
    .filterBounds(region)
    .filterDate(
        "2025-01-01",
        "2025-12-31"
    )
    .filter(
        ee.Filter.lt(
            "CLOUDY_PIXEL_PERCENTAGE",
            20
        )
    )
)


count = collection.size().getInfo()

print("--------------------------------")
print("SENTINEL-2 DOWNLOAD TEST")
print("--------------------------------")
print("Images found:", count)


if count == 0:

    print("No suitable Sentinel-2 image found.")
    raise SystemExit


# Select image with lowest cloud percentage.

image = (
    collection
    .sort("CLOUDY_PIXEL_PERCENTAGE")
    .first()
)


image_id = image.id().getInfo()

cloud_percentage = image.get(
    "CLOUDY_PIXEL_PERCENTAGE"
).getInfo()


print("Selected image:", image_id)
print("Cloud percentage:", cloud_percentage)


# ---------------------------------------------------------
# SELECT REQUIRED BANDS
# ---------------------------------------------------------

image = image.select([
    "B4",
    "B3",
    "B2",
    "B8"
])


# ---------------------------------------------------------
# CREATE DOWNLOAD URL
# ---------------------------------------------------------

download_url = image.getDownloadURL({
    "region": region,
    "dimensions": "512x512",
    "format": "GEO_TIFF"
})


print("--------------------------------")
print("Downloading Sentinel-2 bands...")
print("--------------------------------")


# ---------------------------------------------------------
# DOWNLOAD
# ---------------------------------------------------------

response = requests.get(
    download_url,
    timeout=120
)

response.raise_for_status()


# ---------------------------------------------------------
# SAVE FILE
# ---------------------------------------------------------

output_path = "sentinel2_test.tif"

with open(
    output_path,
    "wb"
) as file:

    file.write(
        response.content
    )


# ---------------------------------------------------------
# RESULT
# ---------------------------------------------------------

file_size = os.path.getsize(
    output_path
)


print("--------------------------------")
print("DOWNLOAD SUCCESSFUL")
print("--------------------------------")
print("File:", output_path)
print(
    "Size:",
    round(file_size / 1024 / 1024, 2),
    "MB"
)
print("--------------------------------")