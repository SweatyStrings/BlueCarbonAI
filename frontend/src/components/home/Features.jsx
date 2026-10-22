import {
  Satellite,
  Leaf,
  BarChart3,
  Brain,
  Globe2,
  TreePine,
} from "lucide-react";

import { motion } from "framer-motion";


const features = [
  {
    icon: Satellite,
    title: "Satellite Imagery",
    description:
      "Use Sentinel-2 satellite imagery from Google Earth Engine to analyze the selected area.",
  },

  {
    icon: Brain,
    title: "AI Forest Analysis",
    description:
      "Use a U-Net deep learning model to identify and estimate forest coverage from satellite imagery.",
  },

  {
    icon: Leaf,
    title: "Carbon Estimation",
    description:
      "Estimate forest area, biomass, stored carbon, and potential carbon credits from the analysis.",
  },

  {
    icon: Globe2,
    title: "Google Earth Engine",
    description:
      "Retrieve real satellite imagery based on the geographic area selected on the map.",
  },

  {
    icon: TreePine,
    title: "Forest Monitoring",
    description:
      "Visualize satellite imagery together with AI-generated forest segmentation results.",
  },

  {
    icon: BarChart3,
    title: "Interactive Analytics",
    description:
      "View carbon metrics, charts, environmental insights, and a detailed analysis report.",
  },
];


export default function Features() {

  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">

      {/* Background decoration */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3" />


      <div className="relative max-w-7xl mx-auto px-6">


        {/* Section Header */}

        <div className="max-w-2xl mx-auto text-center mb-16">

          <p className="text-sm font-semibold uppercase tracking-widest text-green-600 mb-3">
            Platform Capabilities
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Powerful tools for
            <span className="text-green-600">
              {" "}carbon analysis
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            BlueCarbonAI combines satellite imagery, Google Earth Engine,
            and artificial intelligence to analyze forest coverage and
            estimate carbon-related metrics.
          </p>

        </div>


        {/* Feature Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {features.map(
            (
              feature,
              index
            ) => {

              const Icon =
                feature.icon;


              return (

                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay:
                      index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
                >

                  {/* Icon */}

                  <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">

                    <Icon size={28} />

                  </div>


                  {/* Title */}

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>


                  {/* Description */}

                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>


                  {/* Bottom accent */}

                  <div className="mt-6 h-1 w-10 rounded-full bg-green-500 group-hover:w-16 transition-all duration-300" />

                </motion.div>

              );
            }
          )}

        </div>

      </div>

    </section>
  );
}