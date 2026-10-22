import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAnalysis from "../../hooks/useAnalysis";


export default function DownloadButton() {

  const navigate = useNavigate();

  const {
    analysisCompleted,
    areaHectares,
  } = useAnalysis();


  function handleDownloadReport() {

    if (!analysisCompleted) {

      alert(
        "Please complete the analysis before generating the report."
      );

      return;
    }


    if (
      areaHectares === null ||
      areaHectares === undefined
    ) {

      alert(
        "No analysis data is available."
      );

      return;
    }


    navigate("/report");
  }


  return (
    <button
      onClick={handleDownloadReport}
      disabled={!analysisCompleted}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl shadow-lg transition"
    >

      <Download size={18} />

      {analysisCompleted
        ? "Download Report"
        : "Complete Analysis First"}

    </button>
  );
}