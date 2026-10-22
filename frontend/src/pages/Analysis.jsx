import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import MapComponent from "../components/map/MapComponent";
import AnalysisToolbar from "../components/dashboard/AnalysisToolbar";
import ResultCard from "../components/dashboard/ResultCard";

import SatellitePreview from "../components/dashboard/SatellitePreview";

import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import CarbonCharts from "../components/analytics/CarbonCharts";

import LoadingOverlay from "../components/analysis/LoadingOverlay";
import DownloadButton from "../components/report/DownloadButton";


export default function Analysis() {

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-20">

        <div className="w-full">


          {/* =====================================================
              PAGE HEADER
              ===================================================== */}

          <section className="border-b border-slate-200 bg-white">

            <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-3">

                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      AI Environmental Analysis
                    </span>

                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Forest Analysis
                  </h1>

                  <p className="mt-2 text-slate-500 max-w-3xl">
                    Analyze your selected area using Sentinel-2 satellite
                    imagery, Google Earth Engine and AI-powered forest
                    segmentation.
                  </p>

                </div>


                <div className="grid grid-cols-3 gap-3">

                  <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 min-w-[110px]">

                    <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                      Satellite
                    </p>

                    <p className="text-sm font-bold text-slate-700 mt-1">
                      Sentinel-2
                    </p>

                  </div>


                  <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 min-w-[110px]">

                    <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                      AI Model
                    </p>

                    <p className="text-sm font-bold text-slate-700 mt-1">
                      U-Net
                    </p>

                  </div>


                  <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 min-w-[110px]">

                    <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">
                      Platform
                    </p>

                    <p className="text-sm font-bold text-slate-700 mt-1">
                      GEE
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              MAIN ANALYSIS WORKSPACE
              ===================================================== */}

          <section className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8">

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">


              {/* MAP */}

              <div className="xl:col-span-8 h-full">

                <MapComponent />

              </div>


              {/* RIGHT SIDEBAR */}

              <div className="xl:col-span-4 flex flex-col gap-6">

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                  <div className="px-6 py-5 border-b border-slate-100">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                        <span className="text-blue-600 font-bold text-sm">
                          01
                        </span>

                      </div>

                      <div>

                        <h2 className="font-bold text-slate-800">
                          Analysis Controls
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                          Select an area and start analysis
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-5">

                    <AnalysisToolbar />

                  </div>

                </div>


                <ResultCard />

              </div>

            </div>

          </section>


          {/* =====================================================
              SATELLITE ANALYSIS
              ===================================================== */}

          <section className="w-full bg-white border-y border-slate-200">

            <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8">

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">

                <div>

                  <p className="text-xs uppercase tracking-widest font-bold text-blue-600">
                    Remote Sensing
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Satellite Analysis
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Sentinel-2 imagery and AI-generated forest segmentation.
                  </p>

                </div>


                <div className="text-xs font-semibold text-slate-400">
                  Google Earth Engine • Sentinel-2 SR Harmonized
                </div>

              </div>


              <SatellitePreview />

            </div>

          </section>


          {/* =====================================================
              CARBON ANALYTICS
              ===================================================== */}

          <section className="w-full bg-slate-50">

            <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8">

              <div className="mb-6">

                <p className="text-xs uppercase tracking-widest font-bold text-emerald-600">
                  Environmental Metrics
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Carbon Analytics
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  AI-generated forest, biomass and carbon estimates.
                </p>

              </div>


              <AnalyticsDashboard />

            </div>

          </section>


          {/* =====================================================
              CHARTS
              ===================================================== */}

          <section className="w-full bg-slate-50 pb-8">

            <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10">

              <CarbonCharts />

            </div>

          </section>


          {/* =====================================================
              REPORT
              ===================================================== */}

          <section className="w-full bg-slate-50 pb-10">

            <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10">

              <div className="rounded-2xl bg-slate-900 p-6 lg:p-8 shadow-lg">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div>

                    <p className="text-xs uppercase tracking-widest font-bold text-emerald-400">
                      Analysis Report
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-2">
                      Environmental Assessment Complete
                    </h2>

                    <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                      Review the complete satellite analysis, forest metrics,
                      carbon estimates and environmental insights.
                    </p>

                  </div>


                  <DownloadButton />

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>


      <LoadingOverlay />

      <Footer />

    </>
  );
}