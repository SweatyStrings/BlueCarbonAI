import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import MapComponent from "../components/map/MapComponent";

import AnalysisToolbar from "../components/dashboard/AnalysisToolbar";
import ResultCard from "../components/dashboard/ResultCard";
import Statistics from "../components/dashboard/Statistics";
import CarbonChart from "../components/dashboard/CarbonChart";
import SatellitePreview from "../components/dashboard/SatellitePreview";
import LoadingOverlay from "../components/analysis/LoadingOverlay";
import DownloadButton from "../components/report/DownloadButton";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import CarbonCharts from "../components/analytics/CarbonCharts";

export default function Analysis() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <section className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Blue Carbon Analysis
            </h1>

            <p className="text-gray-600 mt-2">
              Select an area, analyze satellite imagery, estimate blue carbon,
              and generate a professional report.
            </p>
          </section>

          {/* Workspace */}
          <section className="grid lg:grid-cols-12 gap-6 mb-8">

            <div className="lg:col-span-8">
              <MapComponent />
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 flex flex-col gap-6">
                <AnalysisToolbar />
                <ResultCard />
              </div>
            </div>

          </section>

          <section className="grid lg:grid-cols-2 gap-6 mb-8">
            <SatellitePreview />
            <CarbonCharts />
          </section>

          <section className="mb-8">
            <AnalyticsDashboard />
          </section>

          <section className="flex justify-end">
            <DownloadButton />
          </section>

        </div>
      </main>
        <LoadingOverlay />
      <Footer />
    </>
  );
}