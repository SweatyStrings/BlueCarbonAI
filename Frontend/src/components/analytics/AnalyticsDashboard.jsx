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
    vegetation,
    biomass,
    carbon,
    credits,
    area,
  } = useAnalysis();

  const carbonDensity =
    area > 0 ? (carbon / area).toFixed(2) : "0.00";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Carbon Analytics
        </h2>

        <p className="text-gray-500">
          AI-generated blue carbon insights
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <KPICard
          title="Vegetation"
          value={vegetation}
          unit="%"
          color="green"
          icon={<FaLeaf />}
        />

        <KPICard
          title="Biomass"
          value={biomass}
          unit="t"
          color="emerald"
          icon={<FaTree />}
        />

        <KPICard
          title="Carbon Stored"
          value={carbon}
          unit="tCO₂"
          color="blue"
          icon={<FaCloud />}
        />

        <KPICard
          title="Carbon Credits"
          value={credits}
          color="amber"
          icon={<FaCoins />}
        />

        <KPICard
          title="Area"
          value={area.toFixed(2)}
          unit="ha"
          color="purple"
          icon={<FaDrawPolygon />}
        />

        <KPICard
          title="Carbon Density"
          value={carbonDensity}
          unit="tCO₂/ha"
          color="blue"
          icon={<FaGlobe />}
        />

      </div>

    </div>
  );
}