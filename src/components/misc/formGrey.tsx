import ContainerTitle from "./containerTitle";
import ContainerWave from "./containerWave";
import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
  width?: string;
};

const FormGrey = ({ children, title, width }: Props) => {
  // Check if the width is defined
  if (!width) {
    width = "xs:w-full sm:w-9/12 md:w-5/12";
  }
  return (
    <div
      className={
        "animated-inactive mx-auto rounded-lg bg-white-1 text-black " + width
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

export default FormGrey;
