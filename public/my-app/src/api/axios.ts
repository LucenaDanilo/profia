import axios from "axios";

const api = axios.create({
  baseURL: "http://10.220.0.71:8080",
});

export default api;