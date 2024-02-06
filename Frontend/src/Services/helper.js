import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://localhost:9090/api/v1";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
   (config) => {
    try {
      const token =  getToken();

      if (token) {
        //console.log(config)
        config.headers.Authorization = `Bearer ${token}`;

      }
    } catch (error) {
      // Handle token retrieval error (e.g., expired token, no token)
      console.error("Error retrieving or using token:", error);
      // Redirect to login page or handle as appropriate
    }

    return config;
  },
  (error) => Promise.reject(error)
);
