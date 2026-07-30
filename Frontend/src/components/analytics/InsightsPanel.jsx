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
    vegetation = 0,
    biomass = 0,
    carbon = 0,
    credits = 0,
    area = 0,
  } = useAnalysis();

  const carbonDensity =
    area > 0 ? (carbon / area).toFixed(2) : "0.00";

  const biomassDensity =
    area > 0 ? (biomass / area).toFixed(2) : "0.00";

  const vegetatedArea =
    ((vegetation / 100) * area).toFixed(2);

  const creditsPerHa =
    area > 0 ? (credits / area).toFixed(2) : "0.00";

  const estimatedTrees =
    Math.round(carbon * 50);

  let vegetationHealth = "Poor";

  if (vegetation >= 80)
    vegetationHealth = "Excellent";
  else if (vegetation >= 60)
    vegetationHealth = "Good";
  else if (vegetation >= 40)
    vegetationHealth = "Moderate";

  let carbonPotential = "Low";

  if (carbon >= 100)
    carbonPotential = "Very High";
  else if (carbon >= 70)
    carbonPotential = "High";
  else if (carbon >= 40)
    carbonPotential = "Moderate";

  const insights = [
    {
      icon: <FaCloud />,
      title: "Carbon Density",
      value: `${carbonDensity} tCO₂/ha`,
    },
    {
      icon: <FaTree />,
      title: "Biomass Density",
      value: `${biomassDensity} t/ha`,
    },
    {
      icon: <FaLeaf />,
      title: "Vegetated Area",
      value: `${vegetatedArea} ha`,
    },
    {
      icon: <FaCoins />,
      title: "Credits per Hectare",
      value: creditsPerHa,
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