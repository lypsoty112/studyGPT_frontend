import BaseButton from "@/components/interactions/baseButton";
import SummaryButton from "@/components/misc/summaryButton";
import BigContainer from "@/components/pageLayout/bigContainer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSummariesForHome } from "@/api/summary";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // TODO: handle loading and error
  useEffect(() => {
    const fetchSummaries = async () => {
      // Parse summaries
      setLoading(true);
      let response = await getSummariesForHome();
      if (response.status !== 200) {
        setError(true);
        setErrorMessage(response.message);
      } else {
        setSummaries(response.data);
      }
      setLoading(false);
    };
    fetchSummaries();
  }, []);
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
            {summaries.length > 0 ? (
              summaries.map(
                ({ id, title, description, date_created }, index) => {
                  return (
                    <SummaryButton
                      key={index}
                      date={new Date(date_created)}
                      title={title}
                      description={description}
                      onClick={() => navigate(`/summary/${id}`)}
                    />
                  );
                }
              )
            ) : (
              <div className="w-full text-center">No summaries found</div>
            )}
          </div>
        </div>
      </BigContainer>
    </MainContainer>
  );
};

export default HomePage;
