import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "./NavButton";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    loginWithRedirect();
  }, [loginWithRedirect]);
  if (!isAuthenticated) {
    return <NavButton displayText="Log In" onClick={handleLogin}></NavButton>;
  }
  return (
    <NavButton
      displayText="Account"
      onClick={() => navigate("/account")}
    ></NavButton>
  );
};

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated) {
    return <NavButton displayText="Log Out" onClick={handleLogout}></NavButton>;
  }
  return <LoginButton></LoginButton>;
};

const AuthButton = () => {
  // Check the current page
  const currentPath = window.location.pathname;
  if (currentPath === "/account") {
    return <LogoutButton></LogoutButton>;
  }
  return <LoginButton></LoginButton>;
};

export default AuthButton;
