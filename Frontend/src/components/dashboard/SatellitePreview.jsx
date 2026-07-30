import useAnalysis from "../../hooks/useAnalysis";
import placeholder from "../../assets/images/satellite-placeholder.jpg";
import { FaSatellite, FaCalendarAlt, FaRulerCombined } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

export default function SatellitePreview() {
  const { vegetation, satelliteImage } = useAnalysis();

  const image = satelliteImage || placeholder;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b">
        <FaSatellite className="text-blue-600 text-xl" />
        <h2 className="text-xl font-bold">Satellite Preview</h2>
      </div>

      {/* Image */}
      <div className="aspect-video bg-gray-100">
        <img
          src={image}
          alt="Satellite Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Metadata */}
      <div className="p-5 space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-500">Source</span>
          <span className="font-semibold">Sentinel-2</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-500">
            <FaCalendarAlt />
            Acquisition
          </span>
          <span className="font-semibold">
            15 Jul 2025
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2 text-gray-500">
            <FaRulerCombined />
            Resolution
          </span>
          <span className="font-semibold">
            10 m
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Selected Area
          </span>
          <span className="font-semibold">
            {vegetation ? vegetation.area_hectares.toFixed(2) : "--"} ha
          </span>
        </div>

        <div className="pt-2 border-t flex items-center justify-between">
          <span className="text-gray-500">Status</span>

          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <MdOutlineVerified />
            Ready for Analysis
          </span>
        </div>

      </div>
    </div>
  );
}