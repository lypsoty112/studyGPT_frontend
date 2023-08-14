import Footer from "@/components/pageLayout/footer";
import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import TextContainer from "@/components/pageLayout/textContainer";

const AboutPage = () => {
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <PageContent>
        <TextContainer title="About" widthClass="xs:w-10/12 w-full">
          <h1 className="mb-4 text-3xl font-bold">About StudyGPT</h1>
          <p>
            Welcome to StudyGPT, your ultimate learning companion! We are
            dedicated to revolutionizing the way you absorb knowledge and master
            new subjects. Our platform leverages cutting-edge technology to
            bring you comprehensive summaries of complete documents and courses,
            tailored to your preferences.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-semibold">Our Vision</h2>
          <p className="mb-4">
            At StudyGPT, we believe that learning should be efficient,
            accessible, and personalized. Our vision is to empower students,
            professionals, and lifelong learners by providing them with a tool
            that condenses complex information into bite-sized, meaningful
            content. By doing so, we aim to help you save time and focus on
            grasping the essence of what matters most in your studies.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-semibold">How It Works</h2>
          <p className="mb-4">
            Our user-friendly web interface allows you to effortlessly upload
            documents and set your preferences for summarization. With just a
            few clicks, our advanced AI algorithms kick into gear, analyzing the
            content, and generating summaries that capture the core concepts and
            key takeaways. Whether you're preparing for exams, seeking to
            understand research papers, or simply enhancing your understanding
            of a topic, StudyGPT is here to guide you.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-semibold">Get Started Today</h2>
          <p className="mb-4">
            Join us in shaping the future of learning. Embrace a new way of
            studying with StudyGPT and unlock the potential of efficient and
            effective learning. Start simplifying your studies and experiencing
            the power of intelligent summarization today.
          </p>
        </TextContainer>
      </PageContent>
      {/*Footer*/}
      <Footer height={5}></Footer>
    </MainContainer>
  );
};

export default AboutPage;
