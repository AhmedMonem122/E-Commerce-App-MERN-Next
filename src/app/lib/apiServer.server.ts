"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function apiServer() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  api.interceptors.request.use(
    async (config) => {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value; // 🍪 server cookies
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
}
