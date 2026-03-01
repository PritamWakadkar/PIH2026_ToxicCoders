import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,   // 🔥 YE SABSE IMPORTANT HAI
});

export default API;