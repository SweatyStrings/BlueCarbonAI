import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import SearchControl from "./SearchControl";
import CurrentLocation from "./CurrentLocation";
import GeomanControls from "./GeomanControls";
import LayerSwitcher from "./LayerSwitcher";

export default function MapComponent() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Interactive GIS Map
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Search a location, navigate to your current position, draw a polygon,
          and estimate blue carbon.
        </p>
      </div>

      {/* Map */}
      <div className="h-[720px] w-full">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={11}
          className="h-full w-full"
        >
          <LayerSwitcher />

          <SearchControl />

          <CurrentLocation />

          <GeomanControls />

        </MapContainer>
      </div>
    </div>
  );
}