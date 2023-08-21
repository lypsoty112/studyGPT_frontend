import React, { createContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type ErrorContextProps = {
  children: React.ReactNode;
};

type ErrorContextType = {
  setError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setLevel: (value: number) => void;
};

const InitialErrorContext: ErrorContextType = {
  setError: () => {},
  setErrorMessage: () => {},
  setLevel: () => {},
};

export const ErrorContext =
  createContext<ErrorContextType>(InitialErrorContext);

const ErrorProvider = ({ children }: ErrorContextProps) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState(0);

  const contextValue: ErrorContextType = {
    setError,
    setErrorMessage,
    setLevel,
  };

  const errorLevels = [
    "border-l-2 border-red-500",
    "border-l-2 border-yellow-500",
    "border-l-2 border-green-500",
    "border-l-2 border-blue-500",
  ];

  // UseEffect
  useEffect(() => {
    // Display the error
    if (error) {
      setTimeout(() => setError(false), 10000);
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
      <div
        className="absolute bottom-0 right-0 z-10 bg-transparent"
        onClick={() => setError(false)}
      >
        <div
          className={
            "animated-base m-4 rounded-md bg-white p-3 text-black" +
            (error ? " block" : " hidden")
          }
        >
          <div>
            <IoClose
              className="float-right cursor-pointer"
              onClick={() => setError(false)}
            />
          </div>
          <div className={errorLevels[level] + " pl-4 "}>{errorMessage}</div>
        </div>
      </div>
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
