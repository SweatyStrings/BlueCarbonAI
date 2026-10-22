import { createContext, useState } from "react";
import { analyzeCarbon } from "../services/carbonService";

export const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  // -------------------------------------------------------
  // LOCATION
  // -------------------------------------------------------

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // -------------------------------------------------------
  // SELECTED AREA
  // -------------------------------------------------------

  const [areaHectares, setAreaHectares] = useState(null);

  // Exact polygon/rectangle drawn by the user.
  const [selectedGeometry, setSelectedGeometry] =
    useState(null);

  // -------------------------------------------------------
  // ANALYSIS RESULTS
  // -------------------------------------------------------

  const [areaAnalysis, setAreaAnalysis] =
    useState(null);

  const [satelliteImage, setSatelliteImage] =
    useState(null);

  const [vegetation, setVegetation] =
    useState(null);

  const [biomass, setBiomass] =
    useState(null);

  const [carbon, setCarbon] =
    useState(null);

  const [credits, setCredits] =
    useState(null);

  // -------------------------------------------------------
  // ANALYSIS STATE
  // -------------------------------------------------------

  const [loading, setLoading] =
    useState(false);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [analysisProgress, setAnalysisProgress] =
    useState(0);

  const [analysisStep, setAnalysisStep] =
    useState("");

  const [analysisCompleted, setAnalysisCompleted] =
    useState(false);

  // -------------------------------------------------------
  // ANALYZE
  // -------------------------------------------------------

  async function analyze() {
    if (
      latitude === null ||
      longitude === null
    ) {
      throw new Error(
        "Please select a location first."
      );
    }

    if (
      areaHectares === null ||
      areaHectares <= 0
    ) {
      throw new Error(
        "Please select an area first."
      );
    }

    if (!selectedGeometry) {
      throw new Error(
        "Please draw an area on the map first."
      );
    }

    try {
      setLoading(true);

      setIsAnalyzing(true);

      setAnalysisCompleted(false);

      // ---------------------------------------------------
      // CALL BACKEND
      // ---------------------------------------------------

      const result = await analyzeCarbon({
        latitude,
        longitude,
        area_hectares: areaHectares,
        geometry: selectedGeometry,
      });

      console.log(
        "Analysis Result:",
        result
      );

      // ---------------------------------------------------
      // VALIDATE RESULT
      // ---------------------------------------------------

      if (
        result.status !== "success"
      ) {
        throw new Error(
          result.message ||
          "Analysis was not successful."
        );
      }

      // ---------------------------------------------------
      // STORE RESULTS
      // ---------------------------------------------------

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

      // ---------------------------------------------------
      // COMPLETE
      // ---------------------------------------------------

      setAnalysisProgress(
        100
      );

      setAnalysisStep(
        "Analysis Complete"
      );

      setAnalysisCompleted(
        true
      );

      return result;

    } catch (error) {

      console.error(
        "Analysis failed:",
        error
      );

      setAnalysisCompleted(
        false
      );

      throw error;

    } finally {

      setLoading(false);

      setIsAnalyzing(false);
    }
  }

  // -------------------------------------------------------
  // PROVIDER
  // -------------------------------------------------------

  return (
    <AnalysisContext.Provider
      value={{
        // Location
        latitude,
        setLatitude,

        longitude,
        setLongitude,

        // Area
        areaHectares,
        setAreaHectares,

        selectedGeometry,
        setSelectedGeometry,

        // Results
        areaAnalysis,
        setAreaAnalysis,

        satelliteImage,
        setSatelliteImage,

        vegetation,
        setVegetation,

        biomass,
        setBiomass,

        carbon,
        setCarbon,

        credits,
        setCredits,

        // State
        loading,
        setLoading,

        isAnalyzing,
        setIsAnalyzing,

        analysisProgress,
        setAnalysisProgress,

        analysisStep,
        setAnalysisStep,

        analysisCompleted,
        setAnalysisCompleted,

        // Function
        analyze,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}