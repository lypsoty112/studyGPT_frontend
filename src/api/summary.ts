import { apiRequest } from "@/api/request";

const BASE = `${import.meta.env.VITE_APP_API_URL}/summary`;

const getSummariesForHome = async () => {
  return await apiRequest("GET", `${BASE}/home`, {}, true);
};

export { getSummariesForHome };
