import { apiRequest } from "@/api/request";
import { setLocalStorage } from "@/api/localStorage";

const BASE = `${import.meta.env.VITE_APP_API_URL}/parameter`;

const getParameters = async () => {
  let parameters = await apiRequest("GET", BASE, {}, true);
  // set the parameters in local storage
  setLocalStorage("parameters", JSON.stringify(parameters.data));
  return parameters;
};

export { getParameters };
