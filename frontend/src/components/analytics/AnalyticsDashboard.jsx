import {
  FaLeaf,
  FaTree,
  FaCloud,
  FaCoins,
  FaDrawPolygon,
  FaGlobe,
} from "react-icons/fa";

import KPICard from "./KPICard";
import useAnalysis from "../../hooks/useAnalysis";


export default function AnalyticsDashboard() {

  const {
    areaHectares,
    areaAnalysis,
    vegetation,
    biomass,
    carbon,
    credits,
  } = useAnalysis();


  // --------------------------------
  // AREA
  // --------------------------------

  const selectedArea =
    areaAnalysis?.selected_area_hectares ??
    areaHectares ??
    0;


  const forestArea =
    areaAnalysis?.forest_area_hectares ??
    0;


  // --------------------------------
  // FOREST COVERAGE
  // --------------------------------

  const forestCoverage =
    vegetation?.forest_coverage_percentage ??
    0;


  // --------------------------------
  // BIOMASS
  // --------------------------------

  const biomassValue =
    biomass?.estimated_biomass_tonnes ??
    0;


  // --------------------------------
  // CARBON
  // --------------------------------

  const carbonValue =
    carbon?.estimated_carbon_tonnes ??
    0;


  // --------------------------------
  // CARBON CREDITS
  // --------------------------------

  const creditValue =
    credits?.estimated_potential_credits ??
    0;


  // --------------------------------
  // CARBON DENSITY
  // --------------------------------

  const carbonDensity =
    forestArea > 0
      ? carbonValue / forestArea
      : 0;


  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Carbon Analytics
        </h2>

        <p className="text-gray-500">
          AI-generated carbon assessment insights
        </p>

      </div>


      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


        {/* Forest Area */}

        <KPICard
          title="Vegetation Area"
          value={forestArea.toFixed(2)}
          unit="ha"
          color="green"
          icon={<FaLeaf />}
        />


        {/* Biomass */}

        <KPICard
          title="Biomass"
          value={biomassValue.toFixed(2)}
          unit="t"
          color="emerald"
          icon={<FaTree />}
        />


        {/* Carbon */}

        <KPICard
          title="Carbon Stored"
          value={carbonValue.toFixed(2)}
          unit="t C"
          color="blue"
          icon={<FaCloud />}
        />


        {/* Credits */}

        <KPICard
          title="Carbon Credits"
          value={creditValue.toFixed(2)}
          unit="Credits"
          color="amber"
          icon={<FaCoins />}
        />


        {/* Selected Area */}

        <KPICard
          title="Area"
          value={selectedArea.toFixed(2)}
          unit="ha"
          color="purple"
          icon={<FaDrawPolygon />}
        />


        {/* Carbon Density */}

        <KPICard
          title="Carbon Density"
          value={carbonDensity.toFixed(2)}
          unit="t C/ha"
          color="blue"
          icon={<FaGlobe />}
        />

      </div>


      {/* Forest Coverage */}

      <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Forest Coverage
            </p>

            <p className="text-2xl font-bold text-green-700 mt-1">
              {forestCoverage.toFixed(2)}%
            </p>

          </div>


          <FaTree className="text-green-600 text-3xl" />

        </div>

      </div>

    </div>
  );
}