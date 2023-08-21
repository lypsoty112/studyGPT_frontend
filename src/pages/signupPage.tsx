import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import BaseButton from "@/components/interactions/baseButton";
import Form from "@/components/misc/form";
import { useState, useEffect, useContext } from "react";
import { register } from "@/api/user";
import { useNavigate } from "react-router-dom";
import { redirectIfLoggedIn } from "@/components/auth/loginFunctions";
import { ErrorContext } from "@/components/pageLayout/error";

const SignupPage = () => {
  // Constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setError, setErrorMessage, setLevel } = useContext(ErrorContext);

  // useEffect(() => {
  useEffect(() => {
    document.title = "StudyGPT - Sign up";
    redirectIfLoggedIn(navigate);
  }, []);

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
    setLoading(true);
    const response = await register(email, password, passwordConfirm);
    // Anything other than 200 is an error
    if (response.status !== 200) {
      // Set the error message
      setErrorMessage(response.message);
      setError(true);
      setLevel(0);

      return;
    }

    // If the response is 200, move to the next page
    setLoading(false);
    navigate("/home");
  };
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <Form title="Sign up">
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
            loading={loading}
            args={{
              id: "submit",
            }}
          >
            Sign in
          </BaseButton>
        </Form>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default SignupPage;
