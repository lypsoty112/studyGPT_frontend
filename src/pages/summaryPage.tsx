import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import SmallContainer from "@/components/misc/smallContainer";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import MarkdownRenderer from "@/components/misc/markdownRenderer";
import { useState, useEffect } from "react";
import PopupContainer from "@/components/pageLayout/popupContainer";
import { getSummary } from "@/api/summary";

const SummaryPage = () => {
  const [display, setDisplay] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState("");

  let markdownElement = (
    <MarkdownRenderer markdown={markdown}></MarkdownRenderer>
  );

  // TODO: Add error handling & loading state
  const fetchData = async () => {
    // Get the id from the url
    const id = window.location.pathname.split("/")[2];
    // Fetch the data from the API
    const response = await getSummary(id);
    console.log(response);
    if (response.status === 200) {
      // Set the data
      setMarkdown(response.data.content);
      setTitle(response.data.title);
      setDescription(response.data.description);
      // Format the date
      const formatDate = (date: Date) => {
        const day = date.getDay();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      };
      setDateCreated(formatDate(new Date(response.data.date_created)));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MainContainer>
        {/*Navbar*/}
        <Navbar />
        {/*Content*/}
        <PageContent>
          <div className="float-left hidden h-full w-3/12 p-3 sm:block">
            <SmallContainer title={title} extraClass="mb-5">
              <div className="text-sm italic">{dateCreated}</div>
            </SmallContainer>
            <SmallContainer title="Description">{description}</SmallContainer>
          </div>
          <div className="float-right h-full w-full p-0 pb-0 sm:w-9/12 sm:p-3">
            <div
              className={
                "animated-inactive h-full w-full flex-col rounded-md bg-white text-black " +
                (display ? "hidden" : "flex")
              }
            >
              <div className="flex w-full items-center rounded-md p-3">
                <div className="flex-grow">
                  <span className=" block text-xl font-medium sm:hidden">
                    Summary
                  </span>
                </div>
                <div className="flex items-center">
                  <BsFullscreen
                    className="cursor-pointer"
                    onClick={() => setDisplay(true)}
                    title="Fullscreen"
                  />
                </div>
              </div>
              <div className=" flex w-full flex-grow overflow-y-auto rounded-md p-3">
                {markdownElement}
              </div>
            </div>
          </div>
        </PageContent>
        {/*Footer*/}
        <Footer height={1}></Footer>
      </MainContainer>
      <PopupContainer display={display}>
        <div className="animated-inactive mx-auto flex w-full flex-col rounded-md bg-white p-3 text-black opacity-100 sm:w-10/12 ">
          <div className="flex w-full items-center rounded-md">
            <div className="flex-grow"></div>
            <div className="flex items-center">
              <BsFullscreenExit
                className="cursor-pointer"
                onClick={() => setDisplay(false)}
              />
            </div>
          </div>
          <div className=" flex w-full flex-grow rounded-md p-3">
            {markdownElement}
          </div>
        </div>
      </PopupContainer>
    </>
  );
};

export default SummaryPage;
