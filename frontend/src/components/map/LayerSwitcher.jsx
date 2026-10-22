import { LayersControl, TileLayer } from "react-leaflet";

const { BaseLayer } = LayersControl;

export default function LayerSwitcher() {
  return (
    <LayersControl position="topright">

      {/* OpenStreetMap */}
      <BaseLayer checked name="OpenStreetMap">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </BaseLayer>

      {/* ESRI Satellite */}
      <BaseLayer name="ESRI World Imagery">
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </BaseLayer>

      {/* OpenTopoMap */}
      <BaseLayer name="Topographic Map">
        <TileLayer
          attribution="&copy; OpenTopoMap contributors"
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
      </BaseLayer>

    </LayersControl>
  );
}