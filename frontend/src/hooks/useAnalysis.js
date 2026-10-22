import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext";

export default function useAnalysis() {
  return useContext(AnalysisContext);
}