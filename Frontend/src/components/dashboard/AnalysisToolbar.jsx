import useAnalysis from "../../hooks/useAnalysis";
import carbonService from "../../services/carbonService";

export default function AnalysisToolbar() {
  const {
    latitude,
    longitude,

    setIsAnalyzing,
    setAnalysisProgress,
    setAnalysisStep,
    setAnalysisCompleted,

    setVegetation,
    setCarbon,
    setSatelliteImage,
  } = useAnalysis();

  const steps = [
    { title: "Preparing AOI", progress: 10 },
    { title: "Fetching Sentinel-2 Imagery", progress: 25 },
    { title: "Preprocessing Image", progress: 40 },
    { title: "Running AI Segmentation", progress: 60 },
    { title: "Estimating Biomass", progress: 75 },
    { title: "Calculating Carbon", progress: 90 },
    { title: "Generating Report", progress: 100 },
  ];

  async function handleAnalyze() {
    if (latitude === null || longitude === null) {
      alert("Please click a location on the map first.");
      return;
    }

    try {
      setAnalysisCompleted(false);
      setIsAnalyzing(true);

      // Show progress animation
      for (const step of steps) {
        setAnalysisStep(step.title);
        setAnalysisProgress(step.progress);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      const result = await carbonService.analyze({
        latitude,
        longitude,
        buffer_meters: 1000,
        ecosystem: "mangrove",
      });

      console.log("Analysis Result:", result);
      console.log("Vegetation:", result.vegetation);
      console.log("Carbon:", result.carbon);

      setVegetation(result.vegetation);
      setCarbon(result.carbon);
      setSatelliteImage(result.overlay_image);

      setAnalysisCompleted(true);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
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