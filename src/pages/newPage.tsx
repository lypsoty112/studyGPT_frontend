import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import BigContainer from "@/components/pageLayout/bigContainer";
import DragAndDropUploadZone from "@/components/interactions/dragAndDropUploadZone";
import FormGreen from "@/components/misc/formGreen";
import BaseButton from "@/components/interactions/baseButton";

const NewPage = () => {
  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <BigContainer>
        <div className="h-full">
          <div className="float-left h-full w-1/3 flex-col p-3">
            <DragAndDropUploadZone />
          </div>
          <div className="float-right h-full w-2/3 p-3">
            <FormGreen title="Information" extraClass="">
              <div className="w-full">
                <BaseButton
                  color={0}
                  onClick={() => console.log("To open summary")}
                >
                  New summary
                </BaseButton>
              </div>
            </FormGreen>
          </div>
        </div>
      </BigContainer>
    </MainContainer>
  );
};

export default NewPage;
