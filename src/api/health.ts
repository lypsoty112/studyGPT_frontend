import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;

const baseUrl = `${url}/health`;

export const getHealth = async () => {
  const response = await axios.get(`${baseUrl}/ping`);
  return response.data;
};
