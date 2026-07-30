import {
  FaLeaf,
  FaTree,
  FaCloud,
  FaCoins,
} from "react-icons/fa6";

import useAnalysis from "../../hooks/useAnalysis";

export default function ResultCard() {
  const {
    vegetation,
    biomass,
    carbon,
    credits,
  } = useAnalysis();

 const cards = [
  {
    title: "Vegetation Area",
    value: vegetation ? vegetation.area_hectares.toFixed(2) : "--",
    suffix: " ha",
    icon: <FaLeaf className="text-green-600 text-3xl" />,
    color: "bg-green-50",
  },
  {
    title: "Vegetation Pixels",
    value: vegetation ? vegetation.vegetation_pixels : "--",
    suffix: "",
    icon: <FaTree className="text-emerald-600 text-3xl" />,
    color: "bg-emerald-50",
  },
  {
    title: "Carbon Stored",
    value: carbon ? carbon.carbon_tonnes.toFixed(2) : "--",
    suffix: " t",
    icon: <FaCloud className="text-blue-600 text-3xl" />,
    color: "bg-blue-50",
  },

];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Analysis Results
      </h2>

      <div className="grid gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} rounded-xl border p-4 flex items-center justify-between`}
          >
            <div>
              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {card.value}
                {card.suffix}
              </h3>
            </div>

            {card.icon}
          </div>
        ))}
      </div>
    </div>
  );
}