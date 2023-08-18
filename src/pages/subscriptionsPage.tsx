import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import FormGrey from "@/components/misc/formGrey";
import BaseButton from "@/components/interactions/baseButton";
import { useState } from "react";
import { useEffect } from "react";
import { getSubscriptions } from "@/api/subscription";
import { loggedIn } from "@/components/auth/loginFunctions";
import { getUserInformation } from "@/api/user";

type SubscriptionBoxProps = {
  id: number;
  title: string;
  price: string;
  description: string;
  onClick: () => void;
  current: boolean;
};

const SubscriptionBox = ({
  id,
  title,
  price,
  description,
  onClick,
  current,
}: SubscriptionBoxProps) => {
  let button;
  // TODO: Link to stripe
  if (current) {
    button = (
      <BaseButton color={2} onClick={() => {}}>
        Current subscription
      </BaseButton>
    );
  } else {
    button = (
      <BaseButton color={1} onClick={onClick}>
        Join
      </BaseButton>
    );
  }
  return (
    <div className="w-full p-2 sm:w-1/3">
      <FormGrey title={title} width="w-full">
        <div className="hidden">{id}</div>
        <div className="h-40 w-full border-b border-black-1 px-3 pb-6">
          <div className="animated-inactive flex h-full w-full items-center justify-center rounded-md bg-gray-1 text-center text-3xl font-bold">
            {"€ " + price}
          </div>
        </div>
        <div className=" max-h-80 overflow-y-auto py-2">{description}</div>
        <div className="pt-3">{button}</div>
      </FormGrey>
    </div>
  );
};

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState(-1);

  // TODO: Error handling
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadSubscriptions = async () => {
    // Check if user is logged in
    if (loggedIn()) {
      // Get the current subscriptionid
      const currentSubscriptionResponse = await getUserInformation();
      if (currentSubscriptionResponse.status === 200) {
        setCurrentSubscription(
          currentSubscriptionResponse.data.subscription.id
        );
      } else {
        setError(true);
        setErrorMessage(
          "Failed to load current subscription: " +
            currentSubscriptionResponse.data
        );
      }
    }

    const response = await getSubscriptions();
    if (response.status === 200) {
      setSubscriptions(response.data);
    } else {
      setError(true);
      setErrorMessage("Failed to load subscriptions: " + response.data);
    }
  };

  useEffect(() => {
    document.title = "StudyGPT - Subscriptions";
    loadSubscriptions();
  }, []);

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <div className="flex h-full w-full flex-col sm:flex-row sm:justify-center">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <SubscriptionBox
                key={subscription.id}
                id={subscription.id}
                title={subscription.title}
                price={subscription.price}
                description={subscription.description}
                onClick={() => {
                  console.log("Clicked");
                }}
                current={subscription.id === currentSubscription}
              />
            ))
          ) : (
            <div className="w-full text-center">No subscriptions available</div>
          )}
        </div>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default SubscriptionsPage;
