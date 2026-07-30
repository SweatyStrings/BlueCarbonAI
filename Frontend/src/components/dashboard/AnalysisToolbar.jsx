import useAnalysis from "../../hooks/useAnalysis";

export default function AnalysisToolbar() {
  const {
    polygon,

    setIsAnalyzing,
    setAnalysisProgress,
    setAnalysisStep,
    setAnalysisCompleted,

    setVegetation,
    setBiomass,
    setCarbon,
    setCredits,
  } = useAnalysis();

  const steps = [
    {
      title: "Preparing AOI",
      progress: 10,
    },
    {
      title: "Fetching Sentinel-2 Imagery",
      progress: 25,
    },
    {
      title: "Preprocessing Image",
      progress: 40,
    },
    {
      title: "Running AI Segmentation",
      progress: 60,
    },
    {
      title: "Estimating Biomass",
      progress: 75,
    },
    {
      title: "Calculating Carbon",
      progress: 90,
    },
    {
      title: "Generating Report",
      progress: 100,
    },
  ];

  async function handleAnalyze() {
    if (!polygon) {
      alert("Please draw a polygon first.");
      return;
    }

    setAnalysisCompleted(false);
    setIsAnalyzing(true);

    for (const step of steps) {
      setAnalysisStep(step.title);
      setAnalysisProgress(step.progress);

      const result = await carbonService.analyzePolygon({
       coordinates,
      area,
      });
    }

    // Mock backend response
    setVegetation(result.vegetation);
    setBiomass(result.biomass);
    setCarbon(result.carbon);
    setCredits(result.credits);
    setSatelliteImage(result.satellite_image);

    setAnalysisCompleted(true);
    setIsAnalyzing(false);
  }

  return (
    <button
      onClick={handleAnalyze}
      className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
    >
      Analyze Area
    </button>
  );
}