import { loggedIn } from "@/components/auth/loginFunctions";
import axios from "axios";

const apiRequest = async (
  method: string,
  url: string,
  data: any,
  loginRequired: boolean
) => {
  // Check if user is logged in
  if (loginRequired && !loggedIn()) {
    return { status: 401, data: [], message: "Unauthorized" };
  }

  // Perform the request
  let response;
  try {
    response = await axios.request({
      method: method,
      url: url,
      data: data,
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
