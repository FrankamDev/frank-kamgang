import axios from "axios";

const api = axios.create({
  baseURL: "https://api.getomiie.com/public/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;