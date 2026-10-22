import useAnalysis from "../../hooks/useAnalysis";


export default function ReportHeader() {

  const {
    areaHectares,
    analysisCompleted,
  } = useAnalysis();


  const today =
    new Date().toLocaleDateString();


  return (
    <div className="border-b pb-6 mb-8">

      <h1 className="text-4xl font-bold text-green-700">
        BlueCarbonAI
      </h1>


      <p className="text-xl text-gray-600 mt-2">
        AI-Based Carbon Assessment Report
      </p>


      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* Report Date */}

        <div>

          <p className="text-gray-500 text-sm">
            Report Date
          </p>

          <p className="font-semibold">
            {today}
          </p>

        </div>


        {/* Area of Interest */}

        <div>

          <p className="text-gray-500 text-sm">
            Area of Interest
          </p>

          <p className="font-semibold">

            {areaHectares !== null &&
            areaHectares !== undefined
              ? `${Number(
                  areaHectares
                ).toFixed(2)} ha`
              : "--"}

          </p>

        </div>


        {/* Report Status */}

        <div>

          <p className="text-gray-500 text-sm">
            Report Status
          </p>

          <p
            className={
              analysisCompleted
                ? "font-semibold text-green-600"
                : "font-semibold text-gray-500"
            }
          >

            {analysisCompleted
              ? "Completed"
              : "No Analysis Yet"}

          </p>

        </div>

      </div>

    </div>
  );
}