import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import Form from "@/components/misc/form";
import BaseButton from "@/components/interactions/baseButton";
import { useState, useEffect, useContext } from "react";
import { getSubscriptions } from "@/api/subscription";
import { loggedIn } from "@/components/auth/loginFunctions";
import { getUserInformation } from "@/api/user";
import { ErrorContext } from "@/components/pageLayout/error";
import { BeatLoader } from "react-spinners";

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
      <Form title={title} width="w-full">
        <div className="hidden">{id}</div>
        <div className="h-40 w-full border-b border-black-1 px-3 pb-6">
          <div className="animated-inactive flex h-full w-full items-center justify-center rounded-md bg-gray-1 text-center text-3xl font-bold">
            {"€ " + price}
          </div>
        </div>
        <div className=" max-h-80 overflow-y-auto py-2">{description}</div>
        <div className="pt-3">{button}</div>
      </Form>
    </div>
  );
};

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState(-1);
  const [loading, setLoading] = useState(false);

  const { setError, setErrorMessage, setLevel } = useContext(ErrorContext);

  const loadingDiv = (
    <div className="mt-5 flex w-full items-center justify-center">
      <BeatLoader color={"#00B300"} loading={loading} />
    </div>
  );

  const loadSubscriptions = async () => {
    // Check if user is logged in
    setLoading(true);
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
        setLevel(0);
      }
    }

    const response = await getSubscriptions();
    if (response.status === 200) {
      setSubscriptions(response.data);
    } else {
      setError(true);
      setErrorMessage("Failed to load subscriptions: " + response.data);
      setLevel(0);
    }
    setLoading(false);
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
          {loading ? (
            <div className="w-full text-center">Loading subscriptions</div>
          ) : subscriptions.length > 0 ? (
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
            loadingDiv
          )}
        </div>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default SubscriptionsPage;
