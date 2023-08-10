import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import FormGrey from "@/components/misc/formGrey";
import Input from "@/components/interactions/input";
import BaseButton from "@/components/interactions/baseButton";
import PaymentContainer from "@/components/misc/paymentContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserInformation } from "@/api/user";
import { useEffect } from "react";

const AccountPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentSubscription, setCurrentSubscription] = useState("");
  const [registeredSince, setRegisteredSince] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const formatDate = (date: Date) => {
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // TODO: handle error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: Get the user's account information from the API
  const setUserInfo = async () => {
    const response = await getUserInformation();
    // Check if the response is valid
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      // Set the user's information
      setEmail(data.email);
      setCurrentSubscription(data.subscription.title);

      setRegisteredSince(formatDate(new Date(data.date_created)));
    } else {
      // Set the error message
      setErrorMessage(response.data.message);
      // Set the error state
      setError(true);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  // ------------------ Functions ------------------
  // On change email
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  // On change new password
  const onChangeNewPassword = (e: any) => {
    setNewPassword(e.target.value);
  };

  // On change new password confirm
  const onChangeNewPasswordConfirm = (e: any) => {
    setNewPasswordConfirm(e.target.value);
  };

  // Focus on the next input on enter
  const focusOnEnter = async (e: any) => {
    if (e.key === "Enter") {
      // Get the id of the current input
      const currentId = e.target.id;
      // Create a switch statement to focus on the next input
      switch (currentId) {
        case "email":
          document.getElementById("newPassword")?.focus();
          break;
        case "newPassword":
          document.getElementById("repeatNewPassword")?.focus();
          break;

        case "repeatNewPassword":
          await handleSave();
          break;
      }
    }
  };
  // On click save
  const handleSave = () => {
    // TODO: Save the user's information
    console.log("Save");
  };

  // TODO: Add the payments

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <div className=" float-left w-full p-4 sm:w-3/5">
          <FormGrey title="Account" width="w-full">
            {/*Inputs */}
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
              <span>New password</span>
              <input
                value={newPassword}
                id="newPassword"
                onChange={onChangeNewPassword}
                onKeyDown={focusOnEnter}
                type="password"
              />
            </div>
            <div className="inputWrapper">
              <span>Repeat new password</span>
              <input
                value={newPasswordConfirm}
                id="repeatNewPassword"
                type="password"
                onKeyDown={focusOnEnter}
                onChange={onChangeNewPasswordConfirm}
              />
            </div>
            <div className="inputWrapper">
              <span>Current subscription</span>
              <input
                value={currentSubscription}
                id="currentSubscription"
                readOnly
              />
            </div>
            <div className="inputWrapper">
              <span>Registered since</span>
              <input value={registeredSince} id="registeredSince" readOnly />
            </div>
            {/*End of inputs*/}
            <div className="flex w-full flex-col md:flex-row">
              <div className="mb-4 flex w-full md:mb-0 md:w-auto">
                <BaseButton
                  color={1}
                  onClick={() => navigate("/subscriptions")}
                >
                  Join another subscription plan
                </BaseButton>
              </div>
              <div className="flex flex-grow md:justify-end">
                <div className="ml-2 md:ml-4">
                  <BaseButton color={1} onClick={handleSave}>
                    Save
                  </BaseButton>
                </div>
              </div>
            </div>
          </FormGrey>
        </div>
        <div className=" max-h-fit w-full overflow-auto p-4 sm:float-right sm:w-2/5">
          <FormGrey title="Payments" width="w-full">
            {
              // Map payments here
              Array.from({ length: 80 }, (_, index) => (
                <PaymentContainer
                  key={index}
                  id="1"
                  date="XX/XX/XXXX"
                  amount="€8.99"
                  status="completed"
                  subscription="Monthly payment"
                ></PaymentContainer>
              ))
            }
          </FormGrey>
        </div>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default AccountPage;
