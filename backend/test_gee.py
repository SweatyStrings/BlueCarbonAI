import ee


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


# Create a small area around the selected point.
region = point.buffer(1000).bounds()


# ---------------------------------------------------------
# SENTINEL-2 COLLECTION
# ---------------------------------------------------------

collection = (
    ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
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


# ---------------------------------------------------------
# CHECK IMAGE COUNT
# ---------------------------------------------------------

count = collection.size().getInfo()

print("--------------------------------")
print("GOOGLE EARTH ENGINE TEST")
print("--------------------------------")
print("Images found:", count)


# ---------------------------------------------------------
# GET FIRST IMAGE
# ---------------------------------------------------------

if count > 0:

    image = collection.sort(
        "CLOUDY_PIXEL_PERCENTAGE"
    ).first()

    image_id = image.id().getInfo()

    cloud_percentage = image.get(
        "CLOUDY_PIXEL_PERCENTAGE"
    ).getInfo()

    print("Image ID:", image_id)
    print(
        "Cloud Percentage:",
        cloud_percentage
    )

    print("--------------------------------")
    print("Sentinel-2 image retrieved successfully")
    print("--------------------------------")

else:

    print("--------------------------------")
    print("No Sentinel-2 images found")
    print("--------------------------------")