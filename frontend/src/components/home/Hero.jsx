import { Link } from "react-router-dom";

import {
  ArrowRight,
  Satellite,
  Brain,
  Leaf,
  BarChart3,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";


export default function Hero() {

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 text-white">

      {/* Background gradients */}

      <div className="absolute inset-0">

        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      </div>


      {/* Subtle grid */}

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />


      {/* Main content */}

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 lg:px-10 flex items-center">

        <div className="w-full grid lg:grid-cols-12 gap-12 items-center pt-20 pb-16">


          {/* Left side */}

          <div className="lg:col-span-8 text-center lg:text-left">


            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-emerald-300 text-sm font-semibold mb-7"
            >

              <Sparkles size={16} />

              AI-Powered Environmental Analysis

            </motion.div>


            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[0.95]"
            >

              BlueCarbon
              
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-400">
                AI
              </span>

            </motion.h1>


            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-7 max-w-3xl mx-auto lg:mx-0 text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed"
            >
              AI-powered forest and carbon assessment using
              <span className="text-white font-semibold">
                {" "}Sentinel-2 satellite imagery
              </span>
              , Google Earth Engine, and deep learning.
            </motion.p>


            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >

              <Link
                to="/analysis"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-7 py-4 font-bold text-lg shadow-xl shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-1"
              >

                Start Analysis

                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />

              </Link>


              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 hover:bg-white/10 backdrop-blur-md px-7 py-4 font-semibold text-lg transition-all duration-300"
              >
                Explore Features
              </a>

            </motion.div>


            {/* Technology tags */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.8,
              }}
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3"
            >

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                Google Earth Engine
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                Sentinel-2
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                U-Net
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                FastAPI
              </span>

            </motion.div>

          </div>


          {/* Right side */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.4,
            }}
            className="hidden lg:block lg:col-span-4"
          >

            <div className="relative">


              {/* Main glass card */}

              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">

                <div className="flex items-center gap-3 mb-7">

                  <div className="w-11 h-11 rounded-xl bg-emerald-400/20 flex items-center justify-center">

                    <Leaf
                      className="text-emerald-300"
                      size={24}
                    />

                  </div>

                  <div>

                    <p className="font-bold">
                      Blue Carbon Analysis
                    </p>

                    <p className="text-xs text-slate-400">
                      AI-powered assessment
                    </p>

                  </div>

                </div>


                {/* Feature rows */}

                <div className="space-y-4">


                  <div className="flex items-center gap-4 rounded-2xl bg-black/20 p-4">

                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">

                      <Satellite
                        className="text-blue-300"
                        size={21}
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Satellite Imagery
                      </p>

                      <p className="text-sm text-slate-400">
                        Sentinel-2 via GEE
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-4 rounded-2xl bg-black/20 p-4">

                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">

                      <Brain
                        className="text-purple-300"
                        size={21}
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        AI Segmentation
                      </p>

                      <p className="text-sm text-slate-400">
                        U-Net forest detection
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-4 rounded-2xl bg-black/20 p-4">

                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">

                      <Leaf
                        className="text-emerald-300"
                        size={21}
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Carbon Estimation
                      </p>

                      <p className="text-sm text-slate-400">
                        Biomass & carbon metrics
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-4 rounded-2xl bg-black/20 p-4">

                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">

                      <BarChart3
                        className="text-cyan-300"
                        size={21}
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Interactive Analytics
                      </p>

                      <p className="text-sm text-slate-400">
                        Charts & insights
                      </p>

                    </div>

                  </div>


                </div>

              </div>


              {/* Decorative glow */}

              <div className="absolute -z-10 inset-8 bg-emerald-500/20 blur-3xl rounded-full" />

            </div>

          </motion.div>

        </div>

      </div>


      {/* Bottom scroll indicator */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.4,
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
      >

        <p className="text-xs text-slate-400 mb-2">
          Explore the platform
        </p>

        <div className="w-6 h-9 rounded-full border border-white/30 flex justify-center pt-2">

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />

        </div>

      </motion.div>

    </section>
  );
}