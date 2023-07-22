import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import BaseButton from "@/components/interactions/baseButton";
import FormGrey from "@/components/misc/formGrey";
import Input from "@/components/interactions/input";

const SignupPage = () => {
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <FormGrey title="Sign in">
          <Input title="E-mail" />
          <Input title="Password" />
          <Input title="Repeat password" />
          <BaseButton color={1} onClick={() => console.log("clicked")}>
            Sign in
          </BaseButton>
        </FormGrey>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default SignupPage;
