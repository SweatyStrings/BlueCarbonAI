import useAnalysis from "../../hooks/useAnalysis";

import placeholder from "../../assets/images/satellite-placeholder.jpg";

import {
  FaSatellite,
} from "react-icons/fa";

import {
  MdOutlineVerified,
} from "react-icons/md";


export default function SatellitePreview() {

  const {
    vegetation,
    satelliteImage,
  } = useAnalysis();


  const forestCoverage =
    vegetation?.forest_coverage_percentage;


  const satelliteSource =
    satelliteImage?.source;


  const imageId =
    satelliteImage?.image_id;


  const cloudPercentage =
    satelliteImage?.cloud_percentage;


  const imagesFound =
    satelliteImage?.images_found;


  const bands =
    satelliteImage?.bands;


  // --------------------------------
  // CACHE BUSTER
  // --------------------------------

  const cacheBuster =
    satelliteImage?.cache_buster ||
    0;


  const BASE_URL =
    "http://127.0.0.1:8000";


  const previewUrl =
    satelliteImage?.preview_url
      ? `${BASE_URL}${satelliteImage.preview_url}?v=${cacheBuster}`
      : placeholder;


  const overlayUrl =
    satelliteImage?.forest_overlay_url
      ? `${BASE_URL}${satelliteImage.forest_overlay_url}?v=${cacheBuster}`
      : placeholder;


  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

            <FaSatellite className="text-blue-600 text-lg" />

          </div>


          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Satellite Imagery
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Sentinel-2 imagery and AI forest segmentation
            </p>

          </div>

        </div>

      </div>


      {/* Images */}

      <div className="p-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* Satellite Image */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <h3 className="font-semibold text-slate-800">
                Sentinel-2 Satellite Image
              </h3>

              <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold">
                RGB
              </span>

            </div>


            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">

              <img
                key={`satellite-${cacheBuster}`}
                src={previewUrl}
                alt="Sentinel-2 satellite imagery"
                className="w-full h-full object-cover"
              />

            </div>

          </div>


          {/* AI Forest Segmentation */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <h3 className="font-semibold text-slate-800">
                AI Forest Segmentation
              </h3>

              <span className="text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold">
                U-Net
              </span>

            </div>


            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">

              <img
                key={`overlay-${cacheBuster}`}
                src={overlayUrl}
                alt="AI forest segmentation overlay"
                className="w-full h-full object-cover"
              />

            </div>


            <p className="text-xs text-slate-400 mt-2">
              Green regions represent areas identified as forest by the AI segmentation model.
            </p>

          </div>

        </div>


        {/* Metadata */}

        <div className="mt-6 pt-6 border-t border-slate-100">

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">


            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

              <p className="text-xs text-slate-400">
                Source
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                {satelliteSource ||
                  "Google Earth Engine"}
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

              <p className="text-xs text-slate-400">
                Cloud Coverage
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">

                {cloudPercentage !== undefined
                  ? `${Number(
                      cloudPercentage
                    ).toFixed(4)}%`
                  : "--"}

              </p>

            </div>


            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

              <p className="text-xs text-slate-400">
                Image Size
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                512 × 512
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

              <p className="text-xs text-slate-400">
                Bands
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                {bands?.length
                  ? bands.join(", ")
                  : "B4, B3, B2, B8"}
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

              <p className="text-xs text-slate-400">
                Images Found
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">

                {imagesFound !== undefined
                  ? imagesFound
                  : "--"}

              </p>

            </div>


            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">

              <p className="text-xs text-emerald-600">
                Forest Coverage
              </p>

              <p className="text-sm font-bold text-emerald-700 mt-1">

                {forestCoverage !== undefined
                  ? `${Number(
                      forestCoverage
                    ).toFixed(2)}%`
                  : "--"}

              </p>

            </div>

          </div>

        </div>


        {/* Image ID */}

        <div className="mt-4 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <span className="text-xs text-slate-400">
              Sentinel-2 Image ID
            </span>

            <span className="text-xs font-semibold text-slate-600 break-all">
              {imageId || "--"}
            </span>

          </div>

        </div>


        {/* Status */}

        <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">

          <span className="text-sm font-medium text-slate-600">
            Analysis Status
          </span>

          <span className="flex items-center gap-2 text-sm font-bold text-emerald-700">

            <MdOutlineVerified />

            GEE Analysis Complete

          </span>

        </div>

      </div>

    </div>

  );
}