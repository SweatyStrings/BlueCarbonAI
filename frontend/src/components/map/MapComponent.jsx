import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import SearchControl from "./SearchControl";
import CurrentLocation from "./CurrentLocation";
import GeomanControls from "./GeomanControls";
import LayerSwitcher from "./LayerSwitcher";


export default function MapComponent() {

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-100">

        <div className="flex items-center justify-between gap-4">

          <div>

            <div className="flex items-center gap-2">

              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Interactive GIS
              </span>

            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-2">
              Select Your Area
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Search a location or draw a polygon/rectangle on the map.
            </p>

          </div>


          <div className="hidden sm:flex items-center px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">

            <span className="text-xs font-medium text-slate-500">
              OpenStreetMap
            </span>

          </div>

        </div>


        {/* Instructions */}

        <div className="flex flex-wrap gap-2 mt-4">

          <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
            1. Find location
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
            2. Draw area
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">
            3. Analyze
          </div>

        </div>

      </div>


      {/* Map */}

      <div className="h-[620px] w-full">

        <MapContainer
          center={[
            12.9716,
            77.5946,
          ]}
          zoom={11}
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LayerSwitcher />

          <SearchControl />

          <CurrentLocation />

          <GeomanControls />

        </MapContainer>

      </div>


      {/* Footer */}

      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">

        <div className="flex items-center justify-between gap-4">

          <p className="text-xs text-slate-500">
            Draw a polygon or rectangle to define your area of interest.
          </p>

          <span className="hidden sm:block text-xs font-medium text-slate-400">
            Powered by Leaflet
          </span>

        </div>

      </div>

    </div>

  );
}