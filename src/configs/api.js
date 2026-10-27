import axios from "axios";
import { getNewTokens } from "src/Services/token";
import { getCookie, setCookies } from "src/utils/cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = getNewTokens().finally(() => {
          refreshPromise = null;
        });
      }

      const res = await refreshPromise;

      if (res?.response) {
        setCookies(res.response.data);
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default api;