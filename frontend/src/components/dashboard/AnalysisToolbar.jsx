import useAnalysis from "../../hooks/useAnalysis";
import carbonService from "../../services/carbonService";


export default function AnalysisToolbar() {

  const {
    latitude,
    longitude,
    areaHectares,
    selectedGeometry,

    setIsAnalyzing,
    setAnalysisProgress,
    setAnalysisStep,
    setAnalysisCompleted,

    setAreaAnalysis,
    setVegetation,
    setBiomass,
    setCarbon,
    setCredits,
    setSatelliteImage,
  } = useAnalysis();


  const steps = [

    {
      title: "Preparing Area of Interest",
      progress: 10,
    },

    {
      title: "Loading Sentinel-2 Imagery",
      progress: 25,
    },

    {
      title: "Preprocessing Image",
      progress: 40,
    },

    {
      title: "Running AI Forest Segmentation",
      progress: 60,
    },

    {
      title: "Calculating Forest Coverage",
      progress: 75,
    },

    {
      title: "Calculating Carbon Metrics",
      progress: 90,
    },

    {
      title: "Analysis Complete",
      progress: 100,
    },

  ];


  async function handleAnalyze() {

    if (
      latitude === null ||
      longitude === null
    ) {

      alert(
        "Please select a location on the map first."
      );

      return;
    }


    if (
      areaHectares === null ||
      areaHectares <= 0
    ) {

      alert(
        "Please draw a polygon or rectangle on the map first."
      );

      return;
    }


    if (!selectedGeometry) {

      alert(
        "Please draw an area on the map first."
      );

      return;
    }


    try {

      setAnalysisCompleted(false);

      setIsAnalyzing(true);


      for (const step of steps) {

        setAnalysisStep(
          step.title
        );

        setAnalysisProgress(
          step.progress
        );

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              300
            )
        );

      }


      const result =
        await carbonService.analyze({

          latitude,

          longitude,

          area_hectares:
            areaHectares,

          geometry:
            selectedGeometry,

        });


      console.log(
        "Analysis Result:",
        result
      );


      if (
        result.status !==
        "success"
      ) {

        throw new Error(
          result.message ||
          "Analysis was not successful."
        );

      }


      // --------------------------------
      // STORE ANALYSIS RESULTS
      // --------------------------------

      setAreaAnalysis(
        result.area || null
      );


      setVegetation(
        result.analysis || null
      );


      setBiomass(
        result.biomass || null
      );


      setCarbon(
        result.carbon || null
      );


      setCredits(
        result.credits || null
      );


      // --------------------------------
      // IMPORTANT:
      // CREATE A NEW CACHE-BUSTER
      // FOR EVERY ANALYSIS
      // --------------------------------

      setSatelliteImage({

        ...(result.satellite || {}),

        cache_buster:
          Date.now(),

      });


      setAnalysisProgress(
        100
      );


      setAnalysisStep(
        "Analysis Complete"
      );


      setAnalysisCompleted(
        true
      );


    } catch (error) {

      console.error(
        "Analysis failed:",
        error
      );


      alert(
        error.message ||
        "Analysis failed. Please try again."
      );


      setAnalysisCompleted(
        false
      );


    } finally {

      setIsAnalyzing(
        false
      );

    }

  }


  return (

    <div className="flex flex-col gap-3">


      {/* Selected Area */}

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">

        <p className="text-xs font-medium text-slate-500">
          Selected Area
        </p>


        <p className="text-2xl font-bold text-slate-800 mt-1">

          {areaHectares !== null
            ? `${areaHectares.toFixed(4)} ha`
            : "--"}

        </p>

      </div>


      {/* Geometry */}

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">

        <p className="text-xs font-medium text-slate-500">
          Selected Geometry
        </p>


        <p className="text-sm font-semibold text-slate-700 mt-1">

          {selectedGeometry
            ? "Area boundary ready"
            : "Draw an area on the map"}

        </p>

      </div>


      {/* Analyze Button */}

      <button

        onClick={
          handleAnalyze
        }

        disabled={
          !selectedGeometry ||
          areaHectares === null ||
          areaHectares <= 0
        }

        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"

      >

        Analyze Selected Area

      </button>

    </div>

  );
}