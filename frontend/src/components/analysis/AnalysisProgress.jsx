import useAnalysis from "../../hooks/useAnalysis";
import ProgressStep from "./ProgressStep";

export default function AnalysisProgress() {
  const {
    analysisProgress,
    analysisStep,
  } = useAnalysis();

  const steps = [
    "Preparing AOI",
    "Fetching Sentinel-2 Imagery",
    "Preprocessing Image",
    "Running AI Segmentation",
    "Estimating Biomass",
    "Calculating Carbon",
    "Generating Report",
  ];

  const currentIndex = steps.indexOf(analysisStep);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">

      <h2 className="text-2xl font-bold mb-6">
        BlueCarbonAI Analysis
      </h2>

      <div className="space-y-3">
        {steps.map((step, index) => {
          let status = "pending";

          if (index < currentIndex) status = "completed";
          else if (index === currentIndex) status = "active";

          return (
            <ProgressStep
              key={step}
              title={step}
              status={status}
            />
          );
        })}
      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">
            Overall Progress
          </span>

          <span className="font-semibold">
            {analysisProgress}%
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-500"
            style={{
              width: `${analysisProgress}%`,
            }}
          />
        </div>

      </div>

    </div>
  );
}