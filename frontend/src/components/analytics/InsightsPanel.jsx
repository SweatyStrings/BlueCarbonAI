import {
  FaLeaf,
  FaTree,
  FaCloud,
  FaCoins,
  FaCheckCircle,
  FaSeedling,
} from "react-icons/fa";

import useAnalysis from "../../hooks/useAnalysis";


export default function InsightsPanel() {

  const {
    areaHectares,
    areaAnalysis,
    vegetation,
    biomass,
    carbon,
    credits,
  } = useAnalysis();


  // --------------------------------
  // SELECTED AREA
  // --------------------------------

  const selectedArea =
    Number(
      areaAnalysis?.selected_area_hectares ??
      areaHectares ??
      0
    );


  // --------------------------------
  // FOREST AREA
  // --------------------------------

  const forestArea =
    Number(
      areaAnalysis?.forest_area_hectares ??
      0
    );


  // --------------------------------
  // FOREST COVERAGE
  // --------------------------------

  const forestCoverage =
    Number(
      vegetation?.forest_coverage_percentage ??
      0
    );


  // --------------------------------
  // BIOMASS
  // --------------------------------

  const biomassValue =
    Number(
      biomass?.estimated_biomass_tonnes ??
      0
    );


  // --------------------------------
  // CARBON
  // --------------------------------

  const carbonValue =
    Number(
      carbon?.estimated_carbon_tonnes ??
      0
    );


  // --------------------------------
  // POTENTIAL CREDITS
  // --------------------------------

  const creditValue =
    Number(
      credits?.estimated_potential_credits ??
      0
    );


  // --------------------------------
  // CARBON DENSITY
  // --------------------------------

  const carbonDensity =
    forestArea > 0
      ? carbonValue / forestArea
      : 0;


  // --------------------------------
  // BIOMASS DENSITY
  // --------------------------------

  const biomassDensity =
    forestArea > 0
      ? biomassValue / forestArea
      : 0;


  // --------------------------------
  // CREDITS PER HECTARE
  // --------------------------------

  const creditsPerHa =
    selectedArea > 0
      ? creditValue / selectedArea
      : 0;


  // --------------------------------
  // ESTIMATED TREES EQUIVALENT
  // --------------------------------
  //
  // This is only a simple project
  // visualization estimate.
  //

  const estimatedTrees =
    Math.round(
      carbonValue * 50
    );


  // --------------------------------
  // VEGETATION HEALTH
  // --------------------------------

  let vegetationHealth = "Poor";


  if (forestCoverage >= 80) {

    vegetationHealth = "Excellent";

  } else if (forestCoverage >= 60) {

    vegetationHealth = "Good";

  } else if (forestCoverage >= 40) {

    vegetationHealth = "Moderate";

  }


  // --------------------------------
  // CARBON POTENTIAL
  // --------------------------------

  let carbonPotential = "Low";


  if (carbonValue >= 100) {

    carbonPotential = "Very High";

  } else if (carbonValue >= 70) {

    carbonPotential = "High";

  } else if (carbonValue >= 40) {

    carbonPotential = "Moderate";

  }


  // --------------------------------
  // INSIGHTS
  // --------------------------------

  const insights = [

    {
      icon: <FaCloud />,
      title: "Carbon Density",
      value: `${carbonDensity.toFixed(2)} t C/ha`,
    },

    {
      icon: <FaTree />,
      title: "Biomass Density",
      value: `${biomassDensity.toFixed(2)} t/ha`,
    },

    {
      icon: <FaLeaf />,
      title: "Forest Area",
      value: `${forestArea.toFixed(2)} ha`,
    },

    {
      icon: <FaCoins />,
      title: "Credits per Hectare",
      value: `${creditsPerHa.toFixed(2)}`,
    },

    {
      icon: <FaSeedling />,
      title: "Estimated Trees Equivalent",
      value: estimatedTrees.toLocaleString(),
    },

    {
      icon: <FaCheckCircle />,
      title: "Vegetation Health",
      value: vegetationHealth,
    },

    {
      icon: <FaCloud />,
      title: "Carbon Potential",
      value: carbonPotential,
    },

  ];


  return (

    <div className="rounded-2xl bg-white shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-2">
        Environmental Insights
      </h2>


      <p className="text-gray-500 mb-6">
        Derived metrics based on AI-generated analysis
      </p>


      <div className="grid gap-4 md:grid-cols-2">

        {insights.map((item) => (

          <div
            key={item.title}
            className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 hover:shadow-md transition"
          >

            <div className="text-2xl text-green-600">

              {item.icon}

            </div>


            <div>

              <p className="text-sm text-gray-500">
                {item.title}
              </p>


              <p className="text-lg font-semibold">
                {item.value}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}