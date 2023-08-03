import { useNavigate } from "react-router-dom";
import NavButton from "./NavButton";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <NavButton
      displayText="Log In"
      onClick={() => navigate("/login")}
    ></NavButton>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <NavButton
      displayText="Log Out"
      onClick={() => {
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
  }
  return <LoginButton></LoginButton>;
};

export default AuthButton;
