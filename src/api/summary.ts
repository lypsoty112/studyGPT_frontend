import { apiRequest, apiPostFile } from "@/api/request";

const BASE = `${import.meta.env.VITE_APP_API_URL}/summary`;
const FILE_TYPES = ["md", "pdf", "docx", "txt"];
const MAX_FILE_SIZE = 251658240; // 30MB
const MIME_TYPES = [
  "text/markdown",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const getSummariesForHome = async () => {
  return await apiRequest("GET", `${BASE}/home`, {}, true);
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
  if (!MIME_TYPES.includes(file.type))
    return { status: 400, message: "File type is not supported", data: {} };
  if (!FILE_TYPES.includes(file.name.split(".").pop()!))
    return {
      status: 400,
      message: "File extension is not supported",
      data: {},
    };

  // Check the parameters
  // Find the distinct parameterClasses
  const parameterClasses = parameters.map((p: any) => p.class.id);
  const distinctParameterClasses = [...new Set(parameterClasses)];

  // Check if the parameterClasses are valid
  if (distinctParameterClasses.length !== parameterClassesCount)
    return {
      status: 400,
      message: "Not every parameter has been filled in.",
      data: {},
    };

  // Change the parameters to be an array of ids

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
