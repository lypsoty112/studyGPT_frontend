// Cookie
import { apiRequest } from "@/api/request";
import { setLocalStorage } from "@/api/localStorage";
import axios from "axios";
// Get the authContext

const BASE = `${import.meta.env.VITE_APP_API_URL}/user`;

const setToken = (givenToken: string) => {
  // Set the cookie
  setLocalStorage("token", givenToken);
};

const register = async (
  email: string,
  password: string,
  passwordConfirm: string
) => {
  // Returns: { status: number, message: string }
  const inputs = {
    email: email.trim().toLowerCase(),
    password: password.trim(),
  };
  const passwordConfirmTrimmed = passwordConfirm.trim();
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  let response;
  // Check for empty fields
  if (!inputs.email)
    return { status: 400, message: "Please enter an email address." };
  if (!inputs.password || !passwordConfirmTrimmed)
    return { status: 400, message: "Please enter a password." };

  // Check for matching passwords
  if (inputs.password !== passwordConfirmTrimmed)
    return { status: 400, message: "Passwords do not match." };

  // Check for valid email using regex
  if (!regexp.test(inputs.email))
    return { status: 400, message: "Please enter a valid email address." };

  // Check for valid password length
  if (inputs.password.length < 8)
    return { status: 400, message: "Password must be at least 8 characters." };

  // Perform the request
  try {
    response = await axios.post(`${BASE}/register`, inputs, {
      withCredentials: true,
    });
    // This returns a token
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
  setToken(response.data.token);
  return { status: 200, message: "Success" };
};

const login = async (email: string, password: string) => {
  // Returns: { status: number, message: string }
  const inputs = {
    email: email.trim().toLowerCase(),
    password: password.trim(),
  };
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  let response;
  // Check for empty fields
  if (!inputs.email)
    return { status: 400, message: "Please enter an email address." };
  if (!inputs.password)
    return { status: 400, message: "Please enter a password." };

  // Check for valid email using regex
  if (!regexp.test(inputs.email))
    return { status: 400, message: "Please enter a valid email address." };

  // Perform the request
  try {
    response = await axios.post(`${BASE}/login`, inputs, {
      withCredentials: true,
    });
    // This returns a token
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
  // Store the cookie received from the server
  const cookie = response.headers["set-cookie"];

  // Set the cookie as a default header for subsequent requests
  axios.defaults.headers.common["Cookie"] = cookie;
  setToken(response.data.token);
  return { status: 200, message: "Success" };
};

const logOut = async () => {
  return await apiRequest("POST", `${BASE}/logout`, {}, true, true);
};

const checkPassword = async (password: string) => {
  // Returns: { status: number, message: string }
  const inputs = {
    password: password.trim(),
  };
  let response;
  // Check for empty fields
  if (!inputs.password)
    return { status: 400, message: "Please enter a password." };

  // Perform the request
  try {
    response = await apiRequest("POST", `${BASE}/checkPassword`, inputs, true);
    // This returns a boolean
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
  return { status: 200, message: "Success", data: response.data };
};

const getUserInformation = async () => {
  return await apiRequest("GET", `${BASE}/me`, {}, true);
};

const editPassword = async (
  newPassword: string,
  newPasswordConfirm: string,
  currentPassword: string
) => {
  // Returns: { status: number, message: string }
  const inputs = {
    newPassword: newPassword.trim(),
    newPasswordConfirm: newPasswordConfirm.trim(),
    currentPassword: currentPassword.trim(),
  };

  // Check for empty fields
  if (
    !inputs.newPassword ||
    !inputs.newPasswordConfirm ||
    !inputs.currentPassword
  )
    return { status: 400, message: "Please fill in all fields." };

  // Check for matching passwords
  if (inputs.newPassword !== inputs.newPasswordConfirm)
    return { status: 400, message: "Passwords do not match." };

  // Check for valid password length
  if (inputs.newPassword.length < 8)
    return { status: 400, message: "Password must be at least 8 characters." };

  // Check for valid current password
  const checkPasswordResponse = await checkPassword(inputs.currentPassword);
  if (checkPasswordResponse.status !== 200)
    return { status: 400, message: "Current password is incorrect." };

  // Perform the request
  return await apiRequest(
    "PUT",
    `${BASE}/me`,
    {
      password: inputs.newPassword,
    },
    true
  );
};

export {
  register,
  login,
  getUserInformation,
  checkPassword,
  editPassword,
  setToken,
  logOut,
};
