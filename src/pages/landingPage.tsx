import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import AttentionDiv from "@/components/misc/attentionDiv";
import BaseButton from "@/components/interactions/baseButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = useCallback(async () => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <div className="mb-10">
          <AttentionDiv>The ultimate summary creator</AttentionDiv>
          <AttentionDiv>Leverage A.I. to work faster & smarter</AttentionDiv>
        </div>
        <BaseButton color={0} onClick={handleLogin}>
          Start now
        </BaseButton>
      </PageContent>
      {/*Footer*/}
      <Footer heightPct={30}></Footer>
    </MainContainer>
  );
};

export default LandingPage;
