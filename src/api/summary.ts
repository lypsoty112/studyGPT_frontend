import { apiRequest, apiPostFile } from "@/api/request";
import { getLocalStorage } from "./localStorage";

const BASE = `${import.meta.env.VITE_APP_API_URL}/summary`;
const FILE_TYPES = ["md", "pdf", "docx", "txt"];
const MAX_FILE_SIZE = 251658240; // 30MB

const getSummariesForHome = async () => {
  return await apiRequest("GET", `${BASE}/home`, {}, true);
};

const checkParameters = (parameters: any[]) => {
  // Make sure that there's at least one parameter
  if (parameters.length == 0)
    return { status: 400, message: "No parameters were included", data: {} };

  // Get the parameters from local storage

  let params = getLocalStorage("parameters");
  if (!params)
    return { status: 400, message: "Parameters not found", data: {} };

  let parsedParams = JSON.parse(params);

  // Get the distinct parameter classes based on class id
  let classes = parsedParams.map((p: any) => p.class);
  // Use reduce and Map to extract distinct classes based on id
  classes = Array.from(
    classes
      .reduce((map: any, item: any) => map.set(item.id, item), new Map())
      .values()
  );

  // Add an array to each class, which will contain the parameter ids
  classes = classes.map((c: any) => {
    return { class: c, param: [] };
  });
  // Add the parameters to their respective classes
  for (let i = 0; i < parsedParams.length; i++) {
    let j = parsedParams[i];
    let index = classes.findIndex((c: any) => c.class.id === j.class.id);
    classes[index].param.push(j);
  }

  for (let i = 0; i < classes.length; i++) {
    let c = classes[i];
    let parametersIncluded = 0;
    for (let j = 0; j < c.param.length; j++) {
      let p = c.param[j];
      if (parameters.find((param: any) => param.id === p.id))
        parametersIncluded++;
    }
    // Check if the number of parameters included in the class is allowed
    if (parametersIncluded == 0 && c.class.allow_empty == 0) {
      return {
        status: 400,
        message: `No parameters were included in '${c.class.name}'`,
        data: {},
      };
    }
    if (parametersIncluded > 1 && c.class["selection_type"] == 0) {
      return {
        status: 400,
        message: `More than one parameter was included in '${c.class.name}', but only one is allowed`,
        data: {},
      };
    }
  }
  return { status: 200 };
};

const newSummary = async (
  {
    title, // string
    description, // string
    parameterClassesCount, // number
    parameters, // Dictionary
  }: {
    title: string;
    description: string;
    parameterClassesCount: number;
    parameters: any[];
  },
  file: File | null
) => {
  // Returns: { status: number, data: any, message: any}
  // Check the file size, type, extension, if it even exists
  if (!file) return { status: 400, message: "No file was uploaded", data: {} };
  if (file.size > MAX_FILE_SIZE)
    return { status: 400, message: "File is too large", data: {} };
  if (!FILE_TYPES.includes(file.name.split(".").pop()!))
    return {
      status: 400,
      message: "File extension is not supported",
      data: {},
    };

  const check = checkParameters(parameters);
  if (check.status !== 200) return check;

  return await apiPostFile(
    `${BASE}/new`,
    {
      title: title,
      description: description,
      parameters: JSON.stringify(parameters.map((p: any) => p.id)),
      file: file,
    },
    true
  );
};

const getSummary = async (id: string) => {
  // Returns: { status: number, data: any, message: any}
  return await apiRequest("GET", `${BASE}/${id}`, {}, true);
};

export { getSummariesForHome, newSummary, getSummary };
