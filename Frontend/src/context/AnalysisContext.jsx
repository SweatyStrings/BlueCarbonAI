import { createContext, useState } from "react";

export const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [satelliteImage, setSatelliteImage] = useState(null);

  const [vegetation, setVegetation] = useState(null);
  const [biomass, setBiomass] = useState(null);
  const [carbon, setCarbon] = useState(null);
  const [credits, setCredits] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysisProgress, setAnalysisProgress] = useState(0);

  const [analysisStep, setAnalysisStep] = useState("");

  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  return (
    <AnalysisContext.Provider
      value={{
        latitude,
        setLatitude,
        
        longitude,
        setLongitude,

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
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}
