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


  // --------------------------------
  // FOREST COVERAGE
  // --------------------------------

  const forestCoverage =
    Number(
      vegetation?.forest_coverage_percentage
    ) || 0;


  const nonForestCoverage =
    Math.max(
      0,
      100 - forestCoverage
    );


  // --------------------------------
  // BIOMASS
  // --------------------------------

  const biomassValue =
    Number(
      biomass?.estimated_biomass_tonnes
    ) || 0;


  // --------------------------------
  // CARBON
  // --------------------------------

  const carbonValue =
    Number(
      carbon?.estimated_carbon_tonnes
    ) || 0;


  // --------------------------------
  // CREDITS
  // --------------------------------

  const creditValue =
    Number(
      credits?.estimated_potential_credits
    ) || 0;


  // --------------------------------
  // VEGETATION DOUGHNUT
  // --------------------------------

  const doughnutData = {

    labels: [
      "Forest",
      "Non-Forest",
    ],

    datasets: [
      {
        data: [
          forestCoverage,
          nonForestCoverage,
        ],

        backgroundColor: [
          "#22c55e",
          "#e5e7eb",
        ],

        borderWidth: 0,
      },
    ],
  };


  // --------------------------------
  // CARBON BAR CHART
  // --------------------------------

  const barData = {

    labels: [
      "Biomass",
      "Carbon",
      "Credits",
    ],

    datasets: [
      {
        label: "Estimated Values",

        data: [
          biomassValue,
          carbonValue,
          creditValue,
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


      {/* --------------------------------
          VEGETATION COVERAGE
          -------------------------------- */}

      <div className="rounded-2xl bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold mb-2">
          Vegetation Coverage
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          AI-estimated forest coverage
        </p>


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

                tooltip: {

                  callbacks: {

                    label: function (
                      context
                    ) {

                      return `${context.label}: ${Number(
                        context.raw
                      ).toFixed(2)}%`;

                    },

                  },

                },

              },

            }}
          />

        </div>


        <div className="text-center mt-2">

          <p className="text-sm text-gray-500">
            Forest Coverage
          </p>

          <p className="text-2xl font-bold text-green-600">
            {forestCoverage.toFixed(2)}%
          </p>

        </div>

      </div>


      {/* --------------------------------
          CARBON METRICS
          -------------------------------- */}

      <div className="rounded-2xl bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold mb-2">
          Carbon Metrics
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Estimated biomass, carbon and potential credits
        </p>


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

              scales: {

                y: {
                  beginAtZero: true,
                },

              },

            }}
          />

        </div>

      </div>

    </div>
  );
}