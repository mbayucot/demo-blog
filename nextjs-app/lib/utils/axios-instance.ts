import axios from "axios";

axios.defaults.headers.get["Content-Type"] = "application/json";

const nextAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTJS_BASE_URL,
});

const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export { nextAxios, apiAxios };
