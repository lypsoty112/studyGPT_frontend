import { apiRequest } from "@/api/request";

const BASE = `${import.meta.env.VITE_APP_API_URL}/subscription`;

const getSubscriptions = async () => {
  return await apiRequest("GET", `${BASE}/`, {}, false);
};

export { getSubscriptions };
