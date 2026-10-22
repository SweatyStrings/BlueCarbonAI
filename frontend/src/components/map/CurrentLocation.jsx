import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function CurrentLocation() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const locationControl = L.control({ position: "topleft" });

    locationControl.onAdd = function () {
      const div = L.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );

      div.style.backgroundColor = "white";
      div.style.width = "38px";
      div.style.height = "38px";
      div.style.cursor = "pointer";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "center";
      div.style.fontSize = "20px";
      div.title = "Current Location";

      div.innerHTML = "📍";

      div.onclick = function () {
        map.locate({
          setView: true,
          maxZoom: 16,
        });
      };

      return div;
    };

    locationControl.addTo(map);

    const onLocationFound = (e) => {
      L.circleMarker(e.latlng, {
        radius: 8,
        color: "#2563eb",
        fillColor: "#3b82f6",
        fillOpacity: 0.8,
      }).addTo(map);
    };

    const onLocationError = () => {
      alert("Unable to access your location.");
    };

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
      map.removeControl(locationControl);
    };
  }, [map]);

  return null;
}