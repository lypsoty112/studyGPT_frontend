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

export { apiRequest };
