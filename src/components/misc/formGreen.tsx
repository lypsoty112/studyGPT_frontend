import ContainerTitle from "./containerTitle";
import ContainerWave from "./containerWave";
import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
  extraClass?: string;
};

const FormGreen = ({ children, title, extraClass }: Props) => {
  return (
    <div
      className={
        "mx-auto rounded-lg bg-green-1 text-white shadow-md transition-all " +
        extraClass
      }
    >
      <div className="px-12 py-8">
        <ContainerTitle title={title} />
        <div>{children}</div>
      </div>
      <div>
        <ContainerWave color="#D9D9D9" className="mt-2 rounded-lg" />
      </div>
    </div>
  );
};

export default FormGreen;
