import { useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import { loggedIn, logOut } from "@/components/auth/loginFunctions";

const LoginButton = () => {
  const navigate = useNavigate();
  // If the user is not logged in, display a login button

  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(loggedIn());
  }, []);

  return (
    <NavButton
      displayText={login ? "Account" : "Log In"}
      onClick={() => navigate(login ? "/account" : "/login")}
    ></NavButton>
  );
};

const SignupButton = () => {
  const navigate = useNavigate();

  return (
    <NavButton
      displayText="Sign Up"
      onClick={() => navigate("/signup")}
    ></NavButton>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <NavButton
      displayText="Log Out"
      onClick={() => {
        logOut();
        navigate("/");
      }}
    ></NavButton>
  );
};

const AuthButton = () => {
  // Check the current page
  const currentPath = window.location.pathname;
  if (currentPath === "/account") {
    return <LogoutButton></LogoutButton>;
  } else if (currentPath === "/login") {
    return <SignupButton></SignupButton>;
  }
  return <LoginButton></LoginButton>;
};

export default AuthButton;
