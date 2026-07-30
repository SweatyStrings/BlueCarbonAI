import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

export default function SearchControl() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Search location...",
    })
      .on("markgeocode", function (e) {
        const bbox = e.geocode.bbox;

        const bounds = L.latLngBounds(
          bbox.getSouthEast(),
          bbox.getNorthWest()
        );

        map.fitBounds(bounds);
      })
      .addTo(map);

    return () => {
      geocoder.remove();
    };
  }, [map]);

  return null;
}