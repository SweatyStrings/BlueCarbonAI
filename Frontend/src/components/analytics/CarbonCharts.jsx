import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import useAnalysis from "../../hooks/useAnalysis";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function CarbonCharts() {
  const {
    vegetation,
    biomass,
    carbon,
    credits,
  } = useAnalysis();

  const doughnutData = {
    labels: ["Vegetation", "Non-Vegetation"],
    datasets: [
      {
        data: [vegetation, 100 - vegetation],
        backgroundColor: [
          "#22c55e",
          "#e5e7eb",
        ],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: [
      "Biomass",
      "Carbon",
      "Credits",
    ],
    datasets: [
      {
        label: "Values",
        data: [
          biomass,
          carbon,
          credits,
        ],
        backgroundColor: [
          "#16a34a",
          "#2563eb",
          "#f59e0b",
        ],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div className="rounded-2xl bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Vegetation Coverage
        </h2>

        <div className="h-80 flex items-center justify-center">
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Carbon Metrics
        </h2>

        <div className="h-80">
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

      </div>

    </div>
  );
}