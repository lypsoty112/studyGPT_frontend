import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import BigContainer from "@/components/pageLayout/bigContainer";
import DragAndDropUploadZone from "@/components/interactions/dragAndDropUploadZone";
import FormGreen from "@/components/misc/formGreen";
import BaseButton from "@/components/interactions/baseButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getParameters } from "@/api/parameter";
import { newSummary } from "@/api/summary";
import { ErrorContext } from "@/components/pageLayout/error";

type ParameterClassProps = {
  elements: any[];
};

const ParameterClass = ({ elements }: ParameterClassProps) => {
  const parameterClass = elements[0].class;
  const selectionType = parameterClass.selectionType;
  let inputElements;

  if (selectionType === 0) {
    // Add radio buttons
    inputElements = elements.map((element, index) => (
      <div key={element.id} className="w-1/2">
        <label title={element.description} className="cursor-pointer">
          <input
            type="radio"
            name={parameterClass.name}
            value={element.id}
            className="cursor-pointer"
          />
          {element.name}
        </label>
      </div>
    ));
  } else {
    // Add checkboxes
    inputElements = elements.map((element, index) => (
      <div key={element.id} className="w-1/2">
        <label title={element.description} className="cursor-pointer">
          <input
            type="checkbox"
            name={parameterClass.name}
            value={element.id}
            className="cursor-pointer"
          />
          {element.name}
        </label>
      </div>
    ));
  }

  return (
    <div className="mb-5 w-full">
      <div className="border-b border-black font-medium">
        {parameterClass.name}
      </div>
      <div className="text-sm italic">{parameterClass.description}</div>
      <div className="flex flex-row flex-wrap">{inputElements}</div>
    </div>
  );
};

const NewPage = () => {
  const navigate = useNavigate();
  const [parameters, setParameters] = useState<{ [key: string]: any[] }>({});
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // Set 1 file to upload

  const { setError, setErrorMessage, setLevel } = useContext(ErrorContext);

  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload = (file: File) => {
    setFile(file);
    if (title === "") {
      setTitle(file.name.split(".")[0]);
    }
  };
  // Load the parameters
  const fetchParameters = async () => {
    const response = await getParameters();

    if (response.status === 200) {
      // Sort the parameters by class
      const sortedParameters = response.data.reduce(
        (acc: any, parameter: any) => {
          if (acc[parameter.class.id]) {
            acc[parameter.class.id].push(parameter);
          } else {
            acc[parameter.class.id] = [parameter];
          }
          return acc;
        },
        {}
      );
      setParameters(sortedParameters);
    } else {
      // Set the error message
      setErrorMessage(response.message);
      setError(true);
      setLevel(0);
    }
  };

  const findCheckedParameters = () => {
    const checkedParameters: any[] = [];
    const parameterClasses = Object.keys(parameters);

    for (const parameterClassId of parameterClasses) {
      const elements = parameters[parameterClassId];
      const parameterClass = elements[0].class;
      const selectionType = parameterClass.selectionType;

      elements.forEach((element) => {
        if (selectionType === 0) {
          const inputElement = document.querySelector(
            `input[type="radio"][name="${parameterClass.name}"][value="${element.id}"]`
          ) as HTMLInputElement;

          if (inputElement.checked) {
            checkedParameters.push(element);
          }
        } else {
          const inputElement = document.querySelector(
            `input[type="checkbox"][name="${parameterClass.name}"][value="${element.id}"]`
          ) as HTMLInputElement;

          if (inputElement.checked) {
            checkedParameters.push(element);
          }
        }
      });
    }

    return checkedParameters;
  };

  const onTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    // Compile the data into 1 object
    // Send the data to the server
    // TODO: Add loading animation
    const response = await newSummary(
      {
        title,
        description,
        parameters: findCheckedParameters(),
        parameterClassesCount: Object.keys(parameters).length,
      },
      file
    );
    if (response.status === 200) {
      // Navigate to the summary page
      const link = `/summary/${response.data.id}/`;
      navigate(link);
    } else {
      // Set the error message
      setErrorMessage(response.message);
      setError(true);
      setLevel(1);
    }
  };

  useEffect(() => {
    document.title = "StudyGPT - New summary";
    fetchParameters();
  }, []);

  return (
    <MainContainer>
      {/*Navbar*/}
      <Navbar />
      {/*Content*/}
      <BigContainer>
        <div className="h-full">
          <div className="float-left h-full w-1/3 flex-col p-3">
            <DragAndDropUploadZone onFileUpload={handleFileUpload} />
          </div>
          <div className="float-right h-full w-2/3 p-3">
            <FormGreen title="Information" extraClass="">
              <div className="inputWrapper">
                <span>Title</span>
                <input
                  value={title}
                  onChange={onTitleChange}
                  className="text-black"
                />
              </div>
              <div className="inputWrapper">
                <span>Description</span>
                <input
                  value={description}
                  onChange={onDescriptionChange}
                  className="text-black"
                />
              </div>
              {
                // Display the parameters
                Object.keys(parameters).map((key) => {
                  return (
                    <ParameterClass elements={parameters[key]} key={key} />
                  );
                })
              }
              <div className="w-full">
                <BaseButton color={0} onClick={handleSubmit}>
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
