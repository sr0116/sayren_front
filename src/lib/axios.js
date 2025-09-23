import axios from "axios";

const api = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

api.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
);

export default api;
