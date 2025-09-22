import axios from "axios";
import { store } from "@/store/store";
import { logout } from "@/store/authSlice";
import { refreshAccessToken } from "@/api/authApi";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_API_BASE_URL + "/api",
  withCredentials: true,
});

export default api;
