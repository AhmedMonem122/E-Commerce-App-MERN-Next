import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/proxy", // Routes through Next.js API proxy
});

export default apiClient;
