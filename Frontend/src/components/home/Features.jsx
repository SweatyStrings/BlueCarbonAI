import { Satellite, Leaf, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Satellite size={40} />,
    title: "Satellite Imagery",
    description:
      "Analyze coastal ecosystems using Sentinel-2 satellite imagery.",
  },
  {
    icon: <Leaf size={40} />,
    title: "Blue Carbon Estimation",
    description:
      "Estimate biomass and carbon stored in mangroves and coastal vegetation.",
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Interactive Reports",
    description:
      "Generate charts, carbon reports, and downloadable PDFs.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="flex justify-center text-blue-700 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}