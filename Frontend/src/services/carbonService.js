import api from "./api";

const carbonService = {
  async analyze(payload) {
    const response = await api.post(
      "/analyze",
      payload
    );

    return response.data;
  },

  async health() {
    const response = await api.get("/");

    return response.data;
  },
};

export default carbonService;
