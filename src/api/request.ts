import { loggedIn } from "@/components/auth/loginFunctions";
import { setToken } from "./user";
import axios from "axios";
const REFRESH_LINK = `${import.meta.env.VITE_APP_API_URL}/user/refresh`;

const refreshTokenWhenExpired = async () => {
  // Check if the token is expired
  const token = localStorage.getItem("token");
  if (!token) return;
  const tokenParts = JSON.parse(atob(token.split(".")[1]));
  const tokenExp = tokenParts.exp * 1000;
  const now = new Date().getTime();
  const diff = tokenExp - now;
  // If the token is not expired, return
  if (diff > 1000) return;

  let response = await axios.request({
    method: "POST",
    url: REFRESH_LINK,
    withCredentials: true,
  });

  // Set the new token in local storage if it exists
  if (response.status === 200) {
    setToken(response.data.token);
  }
};

const apiRequest = async (
  method: string,
  url: string,
  data: any,
  loginRequired: boolean,
  credentialsRequired: boolean = false
) => {
  // Check if user is logged in
  if ((loginRequired || credentialsRequired) && !loggedIn()) {
    return { status: 401, data: [], message: "Unauthorized" };
  }

  // Refresh the token if it is expired
  if (loginRequired) await refreshTokenWhenExpired();
  // Perform the request
  let response;
  try {
    response = await axios.request({
      method: method,
      url: url,
      data: data,
      withCredentials: credentialsRequired,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
      data: [],
    };
  }
  return { status: 200, data: response.data, message: "Success" };
};

const apiPostFile = async (url: string, data: any, loginRequired: boolean) => {
  // Check if user is logged in
  if (loginRequired && !loggedIn()) {
    return { status: 401, data: {}, message: "Unauthorized" };
  }

  // Refresh the token if it is expired
  if (loginRequired) await refreshTokenWhenExpired();

  // Perform the request
  let response;
  try {
    let formData = new FormData();
    // Iterate over all of the data and append it to the form data
    for (let key in data) {
      formData.append(key, data[key]);
    }
    // Console log the form data
    response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
      data: {},
    };
  }
  return { status: 200, data: response.data, message: "Success" };
};

export { apiRequest, apiPostFile };
