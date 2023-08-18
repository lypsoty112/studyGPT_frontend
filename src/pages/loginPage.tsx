import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import FormGrey from "@/components/misc/formGrey";
import BaseButton from "@/components/interactions/baseButton";
import { useState, useEffect } from "react";
import { login } from "@/api/user"; // Assuming the API function for logging in exists
import { useNavigate } from "react-router-dom";
import { redirectIfLoggedIn } from "@/components/auth/loginFunctions";

const loginPage = () => {
  // Constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  useEffect(() => {
    document.title = "StudyGPT - Log in";
    redirectIfLoggedIn(navigate);
  }, []);

  // Messaging
  const displayMessage = (message: string, type: number) => {
    // Set the message
    setMessage(message);
    // Set the color
    switch (type) {
      case 0:
        setColor("text-red-500");
        break;
      case 1:
        setColor("text-green-500");
        break;
      case 2:
        setColor("text-black");
        break;
      default:
        setColor("");
        break;
    }

    // Set a timeout to remove the message
    setTimeout(() => {
      setMessage("");
      setColor("");
    }, 5000);
  };

  // Focus on the next input on enter
  const focusOnEnter = async (e: any) => {
    if (e.key === "Enter") {
      // Get the id of the current input
      const currentId = e.target.id;
      // Create a switch statement to focus on the next input
      switch (currentId) {
        case "email":
          document.getElementById("password")?.focus();
          break;
        case "password":
          await handleSubmit();
          break;
      }
    }
  };

  // Onchange functions
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // Handle submit
  const handleSubmit = async () => {
    const response = await login(email, password); // Assuming the API function for logging in exists
    // Anything other than 200 is an error
    if (response.status !== 200) {
      displayMessage(response.message, 0);
      return;
    }
    navigate("/home");
  };

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <FormGrey title="Log in">
          <div className="inputWrapper">
            <span>E-mail</span>
            <input
              value={email}
              id="email"
              onChange={onChangeEmail}
              onKeyDown={focusOnEnter}
            />
          </div>
          <div className="inputWrapper">
            <span>Password</span>
            <input
              value={password}
              type="password"
              id="password"
              onChange={onChangePassword}
              onKeyDown={focusOnEnter}
            />
          </div>
          <BaseButton color={1} onClick={handleSubmit}>
            Sign in
          </BaseButton>
          <div className="mt-3 flex h-auto items-center justify-center rounded-md p-3 text-center">
            <span className={color}>{message}</span>
          </div>
        </FormGrey>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default loginPage;
