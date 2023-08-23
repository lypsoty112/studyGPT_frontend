import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import SmallContainer from "@/components/misc/smallContainer";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import MarkdownRenderer from "@/components/misc/markdownRenderer";
import { useState, useEffect, useContext } from "react";
import PopupContainer from "@/components/pageLayout/popupContainer";
import { getSummary } from "@/api/summary";
import { ErrorContext } from "@/components/pageLayout/error";

const SummaryPage = () => {
  const [display, setDisplay] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const supportEmail = import.meta.env.VITE_APP_SUPPORT_MAIL || "";
  let markdownElement = (
    <MarkdownRenderer markdown={markdown}></MarkdownRenderer>
  );

  const { setError, setErrorMessage, setLevel } = useContext(ErrorContext);

  const fetchData = async () => {
    // Get the id from the url
    setLoading(true);
    const id = window.location.pathname.split("/")[2];
    // Fetch the data from the API
    const response = await getSummary(id);
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
      // Set the title
      document.title = `StudyGPT - ${response.data.title}`;
    } else {
      // Set the error message
      setErrorMessage(response.message);
      setError(true);
      setLevel(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "StudyGPT - Summary";
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
            <SmallContainer title={title} extraClass="mb-5" loading={loading}>
              <div className="text-sm italic">{dateCreated}</div>
            </SmallContainer>
            <SmallContainer
              title="Description"
              extraClass="mb-5"
              loading={loading}
            >
              {description}
            </SmallContainer>
            <SmallContainer title="Feedback">
              Feedback, questions or suggestions on this summary? Write an
              e-mail to
              <a className=" font-semibold" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
            </SmallContainer>
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
