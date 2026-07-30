import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import useAnalysis from "../../hooks/useAnalysis";

export default function GeomanControls() {
  const map = useMap();

  const markerRef = useRef(null);

  const {
    setLatitude,
    setLongitude,
  } = useAnalysis();

  useEffect(() => {
    if (!map) return;

    function handleClick(e) {
      const { lat, lng } = e.latlng;

      setLatitude(lat);
      setLongitude(lng);

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      markerRef.current = L.marker([lat, lng]).addTo(map);
    }

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
    };
  }, [map, setLatitude, setLongitude]);

  return null;
}
