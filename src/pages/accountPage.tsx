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
        <div className=" float-left w-full p-4 sm:w-3/5">
          <FormGrey title="Account" width="w-full">
            <Input title="E-mail" />
            <Input title="Registered since" />
            <Input title="Last login" />
            <Input title="Current subscription" />
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
                <div className="mx-2 mb-4 md:mx-4 md:mb-0">
                  <BaseButton color={1} onClick={() => console.log("clicked")}>
                    Change password
                  </BaseButton>
                </div>
                <div className="ml-2 md:ml-4">
                  <BaseButton color={1} onClick={() => console.log("clicked")}>
                    Edit
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
