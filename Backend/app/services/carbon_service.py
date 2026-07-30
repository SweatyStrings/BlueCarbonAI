from app.config.carbon_density import CARBON_DENSITY
from app.utils.exceptions import InvalidEcosystemError


class CarbonEstimator:

    def __init__(self):
        self.co2_conversion = 3.67

    def estimate(self, area_hectares, ecosystem):

        if ecosystem not in CARBON_DENSITY:
            raise InvalidEcosystemError(
            f"Unsupported ecosystem: {ecosystem}"
        )

        ecosystem_data = CARBON_DENSITY[ecosystem]

        density = ecosystem_data["carbon_tonnes_per_hectare"]

        carbon = area_hectares * density
        co2 = carbon * self.co2_conversion

        return {
            "ecosystem": ecosystem_data["description"],
            "area_hectares": round(area_hectares, 2),
            "carbon_density": density,
            "carbon_tonnes": round(carbon, 2),
            "co2_equivalent_tonnes": round(co2, 2),
        }