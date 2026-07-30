import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 via-cyan-700 to-green-700 text-white text-center px-6">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl font-bold mb-6"
      >
        BlueCarbonAI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl max-w-4xl"
      >
        AI-powered estimation of Blue Carbon using satellite imagery,
        Google Earth Engine, and Machine Learning.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/analysis"
          className="mt-10 inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Start Analysis
        </Link>
      </motion.div>

    </section>
  );
}