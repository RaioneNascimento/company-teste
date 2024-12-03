import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_APP_API_HOST;

console.log("🚀 ~ baseURL:", baseURL)
export const api = axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'max-age=300',
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
