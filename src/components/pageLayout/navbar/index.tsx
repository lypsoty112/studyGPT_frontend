import logo from "../../../assets/Logo white.png";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="p-5 xs:flex xs:items-center xs:justify-between">
      <div>
        <span className="cursor-pointer text-2xl" onClick={() => navigate("/")}>
          <img className="inline h-10" src={logo} alt="StudyGPT logo"></img>
          StudyGPT
        </span>
      </div>

      <ul className="xs:flex xs:items-center">
        <li className="mx-4">
          <NavButton
            displayText="Log In"
            onClick={() => navigate("/login")}
          ></NavButton>
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
