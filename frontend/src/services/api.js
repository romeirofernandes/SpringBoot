import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Teams API
export const teamsApi = {
  getAll: async () => {
    const response = await api.get("/teams");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },
  create: async (team) => {
    const response = await api.post("/teams", team);
    return response.data;
  },
  update: async (id, team) => {
    const response = await api.put(`/teams/${id}`, team);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/teams/${id}`);
  },
};

// Drivers API
export const driversApi = {
  getAll: async () => {
    const response = await api.get("/drivers");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/drivers/${id}`);
    return response.data;
  },
  getByTeam: async (teamId) => {
    const response = await api.get(`/drivers/team/${teamId}`);
    return response.data;
  },
  create: async (driver) => {
    const response = await api.post("/drivers", driver);
    return response.data;
  },
  update: async (id, driver) => {
    const response = await api.put(`/drivers/${id}`, driver);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/drivers/${id}`);
  },
};

// Races API
export const racesApi = {
  getAll: async () => {
    const response = await api.get("/races");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/races/${id}`);
    return response.data;
  },
  getBySeason: async (season) => {
    const response = await api.get(`/races/season/${season}`);
    return response.data;
  },
  create: async (race) => {
    const response = await api.post("/races", race);
    return response.data;
  },
  update: async (id, race) => {
    const response = await api.put(`/races/${id}`, race);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/races/${id}`);
  },
};

export const circuitsApi = {
  getAll: async () => {
    const response = await api.get("/circuits");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/circuits/${id}`);
    return response.data;
  },
  create: async (circuit) => {
    const response = await api.post("/circuits", circuit);
    return response.data;
  },
  update: async (id, circuit) => {
    const response = await api.put(`/circuits/${id}`, circuit);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/circuits/${id}`);
  },
};
