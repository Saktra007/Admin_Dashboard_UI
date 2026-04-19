import axios from "axios";
import { showToast } from "../utils/toast";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const excludeToastRoutes = ["/login", "/signup"];
    const shouldExclude = excludeToastRoutes.some((route) =>
      url.includes(route),
    );
    if (["post", "put", "delete"].includes(method) && !shouldExclude) {
      showToast(response.data.message || "Action Successful!", "success");
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data.message || "Something went wrong!";

      switch (status) {
        case 400:
          showToast(errorMessage, "error");
          break;

        case 401:
          if (error.config.url.toLowerCase().includes("/login")) {
            showToast(errorMessage, "error");
          } else {
            showToast("Token Expired! Please login again.", "error");

            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");

            if (window.location.pathname !== "/login")
              window.location.href = "/login";
          }
          break;

        case 403:
          showToast("Forbidden: You don't have permission.", "error");
          console.error("Forbidden access");
          break;

        case 404:
          showToast("Not Found: The resource does not exist.", "error");
          console.error("Not Found");
          break;

        case 500:
          showToast("Internal Server Error: Please try again later", "error");
          console.error("Server Error");
          break;

        default:
          showToast(errorMessage, "error");
          console.error("Error:", errorMessage);
      }
    } else if (error.request) {
      showToast("Network Error: No response from server.", "error");
      console.error("Network Error");
    } else {
      showToast(error.message, "error");
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);
export default api;
