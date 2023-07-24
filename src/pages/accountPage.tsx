import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import FormGrey from "@/components/misc/formGrey";
import Input from "@/components/interactions/input";
import BaseButton from "@/components/interactions/baseButton";
import PaymentContainer from "@/components/misc/paymentContainer";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <div className=" float-left h-full w-3/5 p-4">
          <FormGrey title="Account" width="w-full">
            <Input title="E-mail" />
            <Input title="Registered since" />
            <Input title="Last login" />
            <Input title="Current subscription" />
            <div className="flex w-full flex-row ">
              <div className="flex">
                <BaseButton
                  color={1}
                  onClick={() => navigate("/subscriptions")}
                >
                  Join another subscription plan
                </BaseButton>
              </div>
              <div className="flex flex-grow justify-end">
                <div className="mx-4">
                  <BaseButton color={1} onClick={() => console.log("clicked")}>
                    Change password
                  </BaseButton>
                </div>
                <div className="ml-4">
                  <BaseButton color={1} onClick={() => console.log("clicked")}>
                    Edit
                  </BaseButton>
                </div>
              </div>
            </div>
          </FormGrey>
        </div>
        <div className=" float-right h-full max-h-fit w-2/5 overflow-auto p-4">
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
