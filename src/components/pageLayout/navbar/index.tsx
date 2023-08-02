import logo from "../../../assets/Logo white.png";
import NavButton from "./NavButton";
import AuthButton from "./authButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
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
            displayText="About"
            onClick={() => navigate("/about")}
          ></NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
