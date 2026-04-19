import api from "./api";

export const userService = {
  getStats: async () => {
    const response = await api.get("/users/stats");
    return response;
  },
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response;
  },
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response;
  },
  signup: async (data) => {
    const response = await api.post("/users/signup", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  },
  register: async (data) => {
    const response = await api.post("/users/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  },
  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response;
  },
};
