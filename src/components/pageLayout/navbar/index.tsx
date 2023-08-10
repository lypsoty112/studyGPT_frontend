import logo from "../../../assets/Logo white.png";
import NavButton from "./NavButton";
import AuthButton from "./authButton";
import { useNavigate } from "react-router-dom";
import { loggedIn } from "@/components/auth/loginFunctions";

const Navbar = () => {
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
            displayText="About"
            onClick={() => navigate("/about")}
          ></NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
