def calculate_area(vegetation_pixels, pixel_area_m2):
    """
    Convert vegetation pixels into hectares.
    """

    area_m2 = vegetation_pixels * pixel_area_m2

    area_hectares = area_m2 / 10000

    return area_hectares


def calculate_carbon(area_hectares, carbon_density=100):
    """
    Estimate carbon stored.

    carbon_density is tonnes of carbon per hectare.
    """

    carbon_tonnes = area_hectares * carbon_density

    return carbon_tonnes