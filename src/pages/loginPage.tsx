import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import FormGrey from "@/components/misc/formGrey";
import Input from "@/components/interactions/input";
import BaseButton from "@/components/interactions/baseButton";

const LoginPage = () => {
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <FormGrey title="Log in">
          <Input title="E-mail" />
          <Input title="Password" />
          <BaseButton color={1} onClick={() => console.log("clicked")}>
            Log in
          </BaseButton>
        </FormGrey>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default LoginPage;
