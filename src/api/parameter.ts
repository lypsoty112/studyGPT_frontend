import { apiRequest } from "@/api/request";

const BASE = `${import.meta.env.VITE_APP_API_URL}/parameter`;

const getParameters = async () => {
  return await apiRequest("GET", BASE, {}, true);
};

export { getParameters };
