import ReportHeader from "./ReportHeader";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";
import CarbonCharts from "../analytics/CarbonCharts";
import InsightsPanel from "../analytics/InsightsPanel";
import SatellitePreview from "../analysis/SatellitePreview";

export default function ReportPreview() {
  return (
    <div className="bg-gray-100 rounded-2xl p-8">

      <div className="mx-auto max-w-7xl bg-white rounded-2xl shadow-xl p-10">

        <ReportHeader />

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <SatellitePreview />

          <div className="rounded-xl border border-dashed border-gray-300 flex items-center justify-center h-80">
            <p className="text-gray-500">
              Map Snapshot (Backend)
            </p>
          </div>

        </div>

        <div className="mb-10">
          <AnalyticsDashboard />
        </div>

        <div className="mb-10">
          <CarbonCharts />
        </div>

        <div className="mb-10">
          <InsightsPanel />
        </div>

      </div>

    </div>
  );
}