import { motion, AnimatePresence } from "framer-motion";
import useAnalysis from "../../hooks/useAnalysis";
import AnalysisProgress from "./AnalysisProgress";

export default function LoadingOverlay() {
  const { isAnalyzing } = useAnalysis();

  return (
    <AnimatePresence>
      {isAnalyzing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <AnalysisProgress />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}