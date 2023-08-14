import logo from "../../../assets/Logo white.png";
import NavButton from "./NavButton";
import AuthButton from "./authButton";
import { useNavigate } from "react-router-dom";
import { loggedIn } from "@/components/auth/loginFunctions";

const Navbar = () => {
  const currentPath = window.location.pathname;
  let aboutButtonData = {
    displayText: "About",
    onClick: () => navigate("/about"),
  };
  if (currentPath === "/about") {
    aboutButtonData = {
      displayText: "Pricing",
      onClick: () => navigate("/subscriptions"),
    };
  }

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(loggedIn() ? "/home" : "/");
  };

  return (
    <nav className="p-5 xs:flex xs:items-center xs:justify-between">
      <div>
        <span className="cursor-pointer text-2xl" onClick={handleLogoClick}>
          <img className="inline h-10" src={logo} alt="StudyGPT logo"></img>
          StudyGPT
        </span>
      </div>

      <ul className="xs:flex xs:items-center">
        <li className="mx-4">
          <AuthButton></AuthButton>
        </li>
        <li className="mx-4">
          <NavButton
            displayText={aboutButtonData.displayText}
            onClick={aboutButtonData.onClick}
          ></NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
