import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Form from "@/components/misc/form";
import BaseButton from "@/components/interactions/baseButton";
import { useState, useEffect, useContext } from "react";
import { login } from "@/api/user"; // Assuming the API function for logging in exists
import { useNavigate } from "react-router-dom";
import { redirectIfLoggedIn } from "@/components/auth/loginFunctions";
import { ErrorContext } from "@/components/pageLayout/error";

const loginPage = () => {
  // Constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const { setError, setErrorMessage, setLevel } = useContext(ErrorContext);
  // useEffect(() => {
  useEffect(() => {
    document.title = "StudyGPT - Log in";
    redirectIfLoggedIn(navigate);
  }, []);

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
    setLoading(true);
    const response = await login(email, password); // Assuming the API function for logging in exists
    // Anything other than 200 is an error
    if (response.status !== 200) {
      // Set the error message
      setErrorMessage(response.message);
      setError(true);
      setLevel(0);
      return;
    }
    setLoading(false);
    navigate("/home");
  };

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <Form title="Log in">
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
          <BaseButton color={1} onClick={handleSubmit} loading={loading}>
            Sign in
          </BaseButton>
        </Form>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default loginPage;
