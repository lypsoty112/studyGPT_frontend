import { apiRequest } from "@/api/request";

const BASE = `${import.meta.env.VITE_APP_API_URL}/payment`;

const getUserPayments = async () => {
  return await apiRequest("GET", `${BASE}/token`, {}, true);
};

export { getUserPayments };
