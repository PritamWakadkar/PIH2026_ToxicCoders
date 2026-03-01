import axios from "axios";

const API = axios.create({
  baseURL: "http://pih2026-toxiccoders.onrender.com/api",
  withCredentials: true,   // 🔥 YE SABSE IMPORTANT HAI
});

export default API;