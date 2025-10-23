import axios from "axios";

// 프록시 버전 (Next.js → /api/proxy → Spring)
const api = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

api.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
);

const noApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_API_BASE_URL,
  withCredentials: true,
});

noApi.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
);

export { api, noApi };
