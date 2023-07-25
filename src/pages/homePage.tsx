import BaseButton from "@/components/interactions/baseButton";
import SummaryButton from "@/components/misc/summaryButton";
import BigContainer from "@/components/pageLayout/bigContainer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <BigContainer>
        <div className="h-full bg-white">
          {/*Title*/}
          <div className="flex w-full items-center overflow-y-auto overflow-x-hidden border-b-2 border-black pb-3 pr-3">
            <div className="hidden w-full flex-grow text-3xl font-bold xs:block">
              My summaries
            </div>
            <BaseButton color={1} onClick={() => navigate("/new")}>
              New summary
            </BaseButton>
          </div>
          {/*Summaries*/}
          <div className="mt-5 flex flex-wrap bg-white">
            {Array.from({ length: 80 }, (_, index) => (
              <SummaryButton
                key={index}
                title={index.toString()}
                date="XX/XX/XXXX"
                description="fdsqfdqsdqsFSQ FDSQJFD SQMFDJ QKMFD SJKQMF JDSQKMS DQMF DSLKQMJFIEAZIMFJDIMQVJ IMSQFJDQSM FDJIQMCS LQKMFJDSKLQMFJDSIMQ JFIDSQM JFDQSIM"
                onClick={() => navigate("/summary")}
              />
            ))}
          </div>
        </div>
      </BigContainer>
    </MainContainer>
  );
};

export default HomePage;