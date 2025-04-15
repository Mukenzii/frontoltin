import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../configs/app.config";

export const request = axios.create({ baseURL: API_URL });

request.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${Cookies.get("user_token")}`;

  return config;
});

export const superRequest = axios.create({ baseURL: API_URL });

superRequest.interceptors.request.use((config) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${Cookies.get("user_token")}`;

  return config;
});
