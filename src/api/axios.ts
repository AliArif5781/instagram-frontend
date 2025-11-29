import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_URI;
// const API_BASE_URL = "http://localhost:3000";
// console.log(API_BASE_URL, "axios");
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
