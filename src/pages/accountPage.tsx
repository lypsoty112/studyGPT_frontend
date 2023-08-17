import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import FormGrey from "@/components/misc/formGrey";
import BaseButton from "@/components/interactions/baseButton";
import PaymentContainer from "@/components/misc/paymentContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserInformation } from "@/api/user";
import { useEffect } from "react";
import { getUserPayments } from "@/api/payment";
import PopupContainer from "@/components/pageLayout/popupContainer";

const AccountPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentSubscription, setCurrentSubscription] = useState("");
  const [registeredSince, setRegisteredSince] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const [locked, setLocked] = useState(false);

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

  const setPaymentsInfo = async () => {
    const response = await getUserPayments();
    if (response.status === 200) {
      setPayments(response.data);
    } else {
      // Set the error message
      setErrorMessage(response.message);
      // Set the error state
      setError(true);
    }
  };

  const setUserInfo = async () => {
    const response = await getUserInformation();
    // Check if the response is valid
    if (response.status === 200) {
      const data = response.data;
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
    setPaymentsInfo();
  }, []);
  return (
    <>
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
                <input value={email} id="email" readOnly />
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
                    <BaseButton
                      color={1}
                      onClick={() => navigate("/editPassword")}
                    >
                      Change password
                    </BaseButton>
                  </div>
                </div>
              </div>
            </FormGrey>
          </div>
          <div className=" max-h-fit w-full overflow-auto p-4 sm:float-right sm:w-2/5">
            <FormGrey title="Payments" width="w-full">
              {payments.length > 0 ? (
                payments.map((payment) => {
                  return (
                    <PaymentContainer
                      key={payment.id}
                      id={payment.id}
                      date={payment.date}
                      amount={payment.amount}
                      status={payment.status}
                      subscription={payment.subscription.id}
                    />
                  );
                })
              ) : (
                <div className="text-center">No payments yet</div>
              )}
            </FormGrey>
          </div>
        </PageContent>
        {/*Footer*/}
        <Footer height={5}></Footer>
      </MainContainer>
      <PopupContainer display={locked}>
        <FormGrey title="Account" width="w-1/2"></FormGrey>
      </PopupContainer>
    </>
  );
};

export default AccountPage;
