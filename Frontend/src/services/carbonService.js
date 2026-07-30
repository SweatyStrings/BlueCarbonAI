const BASE_URL = "http://127.0.0.1:8000";

async function analyzeCarbon(data) {
  const response = await fetch(`${BASE_URL}/carbon/estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return await response.json();
}

const carbonService = {
  analyze: analyzeCarbon,
};

export { analyzeCarbon };
export default carbonService;