import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import BaseButton from "@/components/interactions/baseButton";
import FormGrey from "@/components/misc/formGrey";
import { useState, useEffect } from "react";
import { register } from "@/api/user";
import { useNavigate } from "react-router-dom";
import { redirectIfLoggedIn } from "@/components/auth/loginFunctions";

const SignupPage = () => {
  // Constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  useEffect(() => {
    document.title = "StudyGPT - Sign up";
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
    }
  };

  // Onchange functions
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e: any) => {
    setPasswordConfirm(e.target.value);
  };

  const startLoading = () => {
    setLoading(true);
    displayMessage("Loading...", 2);
  };
  const stopLoading = () => {
    setLoading(false);
    displayMessage("", 2);
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
          document.getElementById("passwordConfirm")?.focus();
          break;
        case "passwordConfirm":
          await handleSubmit();
          break;
      }
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (loading) return;
    startLoading();
    const response = await register(email, password, passwordConfirm);
    stopLoading();
    // Anything other than 200 is an error
    if (response.status !== 200) {
      displayMessage(response.message, 0);
      setTimeout(() => {
        displayMessage("", 2);
      }, 10000);
      return;
    }

    // If the response is 200, move to the next page
    navigate("/home");
  };
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <FormGrey title="Sign up">
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
          <div className="inputWrapper">
            <span>Repeat password</span>
            <input
              value={passwordConfirm}
              type="password"
              id="passwordConfirm"
              onChange={onChangePasswordConfirm}
              onKeyDown={focusOnEnter}
            />
          </div>
          <BaseButton
            color={1}
            onClick={handleSubmit}
            args={{
              id: "submit",
            }}
          >
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

export default SignupPage;
