import { logOut as logOutRequest } from "@/api/user";

const loggedIn = () => {
  // Check if the user is logged in by checking if the token exists
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const logOut = async () => {
  await logOutRequest();
  localStorage.removeItem("token");
};

const redirectIfLoggedIn = (navigate: any) => {
  if (loggedIn()) {
    navigate("/home");
  }
};

export { loggedIn, logOut, redirectIfLoggedIn };
