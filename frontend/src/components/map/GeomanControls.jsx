import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";

import useAnalysis from "../../hooks/useAnalysis";

export default function GeomanControls() {
  const map = useMap();

  const markerRef = useRef(null);
  const polygonRef = useRef(null);

  const {
    setLatitude,
    setLongitude,
    setAreaHectares,
    setSelectedGeometry,
  } = useAnalysis();

  useEffect(() => {
    if (!map) return;

    // -----------------------------------------------------
    // GEOMAN CONTROLS
    // -----------------------------------------------------

    if (map.pm) {
      map.pm.addControls({
        position: "topleft",

        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: true,
        drawPolygon: true,
        drawMarker: false,
        drawText: false,

        editMode: true,
        dragMode: false,
        cutPolygon: false,
        removalMode: true,
      });
    }

    // -----------------------------------------------------
    // MAP CLICK
    // -----------------------------------------------------

    function handleClick(e) {
      const { lat, lng } = e.latlng;

      setLatitude(lat);
      setLongitude(lng);

      // A new point selection does not have an area.
      setAreaHectares(null);

      // Clear previous geometry.
      setSelectedGeometry(null);

      // Remove previous marker.
      if (markerRef.current) {
        map.removeLayer(
          markerRef.current
        );
      }

      markerRef.current =
        L.marker([lat, lng]).addTo(map);

      console.log(
        "Selected Location"
      );

      console.log(
        "Latitude:",
        lat
      );

      console.log(
        "Longitude:",
        lng
      );
    }

    // -----------------------------------------------------
    // AREA CREATED
    // -----------------------------------------------------

    function handleCreate(e) {
      const layer = e.layer;

      // Remove previous geometry.
      if (polygonRef.current) {
        map.removeLayer(
          polygonRef.current
        );
      }

      polygonRef.current = layer;

      // ---------------------------------------------------
      // GET CENTER
      // ---------------------------------------------------

      const center =
        layer
          .getBounds()
          .getCenter();

      setLatitude(center.lat);
      setLongitude(center.lng);

      // ---------------------------------------------------
      // GET LAT/LNG POINTS
      // ---------------------------------------------------

      let latLngs =
        layer.getLatLngs();

      // Rectangle and polygon layers
      // can return nested arrays.

      if (
        Array.isArray(latLngs[0])
      ) {
        latLngs = latLngs[0];
      }

      // ---------------------------------------------------
      // CONVERT TO GEOJSON COORDINATES
      // ---------------------------------------------------

      const coordinates =
        latLngs.map(
          (point) => [
            point.lng,
            point.lat,
          ]
        );

      // ---------------------------------------------------
      // CLOSE POLYGON
      // ---------------------------------------------------

      if (
        coordinates.length > 0 &&
        (
          coordinates[0][0] !==
            coordinates[
              coordinates.length - 1
            ][0] ||

          coordinates[0][1] !==
            coordinates[
              coordinates.length - 1
            ][1]
        )
      ) {
        coordinates.push(
          coordinates[0]
        );
      }

      // ---------------------------------------------------
      // VALIDATE
      // ---------------------------------------------------

      if (
        coordinates.length < 4
      ) {
        console.error(
          "Invalid polygon."
        );

        return;
      }

      // ---------------------------------------------------
      // CREATE TURF POLYGON
      // ---------------------------------------------------

      const polygon =
        turf.polygon([
          coordinates
        ]);

      // ---------------------------------------------------
      // CALCULATE AREA
      // ---------------------------------------------------

      const areaSquareMeters =
        turf.area(
          polygon
        );

      const areaHectares =
        areaSquareMeters /
        10000;

      // ---------------------------------------------------
      // SAVE AREA
      // ---------------------------------------------------

      setAreaHectares(
        areaHectares
      );

      // ---------------------------------------------------
      // SAVE EXACT GEOMETRY
      // ---------------------------------------------------
      //
      // This is the important new part.
      //
      // The backend will eventually receive
      // these exact polygon coordinates.
      //

      const geometry = {
        type: "Polygon",

        coordinates: [
          coordinates
        ],
      };

      setSelectedGeometry(
        geometry
      );

      // ---------------------------------------------------
      // DEBUG
      // ---------------------------------------------------

      console.log(
        "--------------------------------"
      );

      console.log(
        "SELECTED AREA"
      );

      console.log(
        "--------------------------------"
      );

      console.log(
        "Area:",
        areaSquareMeters.toFixed(2),
        "m²"
      );

      console.log(
        "Area:",
        areaHectares.toFixed(4),
        "hectares"
      );

      console.log(
        "Center Latitude:",
        center.lat
      );

      console.log(
        "Center Longitude:",
        center.lng
      );

      console.log(
        "Selected Geometry:",
        geometry
      );

      console.log(
        "--------------------------------"
      );
    }

    // -----------------------------------------------------
    // EVENTS
    // -----------------------------------------------------

    map.on(
      "click",
      handleClick
    );

    map.on(
      "pm:create",
      handleCreate
    );

    // -----------------------------------------------------
    // CLEANUP
    // -----------------------------------------------------

    return () => {
      map.off(
        "click",
        handleClick
      );

      map.off(
        "pm:create",
        handleCreate
      );

      if (markerRef.current) {
        map.removeLayer(
          markerRef.current
        );
      }

      if (polygonRef.current) {
        map.removeLayer(
          polygonRef.current
        );
      }

      if (map.pm) {
        map.pm.removeControls();
      }
    };

  }, [
    map,
    setLatitude,
    setLongitude,
    setAreaHectares,
    setSelectedGeometry,
  ]);

  return null;
}