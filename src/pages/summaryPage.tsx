import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import SmallContainer from "@/components/misc/smallContainer";
import { BsFullscreen } from "react-icons/bs";

const SummaryPage = () => {
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <div className="float-left h-full w-3/12 p-3">
          <SmallContainer title="Summary" extraClass="mb-5">
            test
          </SmallContainer>
          <SmallContainer title="Description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            suscipit porta eros et tincidunt. Donec purus augue, blandit et
            dictum in, fermentum sed tellus. Integer eget turpis nisi. Maecenas
            in.
          </SmallContainer>
        </div>
        <div className="float-right h-full w-9/12 p-3">
          <div className="h-full w-full rounded-md bg-white text-black shadow-md">
            <div className=" block h-95/100 w-full overflow-y-auto rounded-md p-3">
              fdsqfds
            </div>
            <div className="flex h-5/100 w-full items-center rounded-md px-3">
              <div className="flex-grow"></div>
              <div className="flex items-center">
                <BsFullscreen className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </PageContent>
      {/*Footer*/}
      <Footer height={1}></Footer>
    </MainContainer>
  );
};

export default SummaryPage;
