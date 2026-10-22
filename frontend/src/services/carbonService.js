const BASE_URL = "http://127.0.0.1:8000";

async function analyzeCarbon(data) {
  const latitude = Number(data.latitude);

  const longitude = Number(data.longitude);

  const areaHectares =
    data.area_hectares !== null &&
    data.area_hectares !== undefined
      ? Number(data.area_hectares)
      : null;

  const geometry = data.geometry;

  // -------------------------------------------------------
  // VALIDATION
  // -------------------------------------------------------

  if (
    Number.isNaN(latitude) ||
    Number.isNaN(longitude)
  ) {
    throw new Error(
      "Invalid latitude or longitude."
    );
  }

  if (
    areaHectares === null ||
    Number.isNaN(areaHectares) ||
    areaHectares <= 0
  ) {
    throw new Error(
      "Invalid selected area."
    );
  }

  if (!geometry) {
    throw new Error(
      "No selected geometry was provided."
    );
  }

  // -------------------------------------------------------
  // QUERY PARAMETERS
  // -------------------------------------------------------

  const params = new URLSearchParams();

  params.append(
    "latitude",
    latitude.toString()
  );

  params.append(
    "longitude",
    longitude.toString()
  );

  params.append(
    "area_hectares",
    areaHectares.toString()
  );

  // Send the exact GeoJSON geometry
  // to the FastAPI backend.

  params.append(
    "geometry",
    JSON.stringify(geometry)
  );

  // -------------------------------------------------------
  // API REQUEST
  // -------------------------------------------------------

  const response = await fetch(
    `${BASE_URL}/analyze?${params.toString()}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // -------------------------------------------------------
  // HANDLE ERROR
  // -------------------------------------------------------

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Analysis failed: ${errorText}`
    );
  }

  // -------------------------------------------------------
  // RESPONSE
  // -------------------------------------------------------

  return await response.json();
}


// ---------------------------------------------------------
// SERVICE
// ---------------------------------------------------------

const carbonService = {
  analyze: analyzeCarbon,
};


export { analyzeCarbon };


export default carbonService;