import ContainerTitle from "./containerTitle";
import ContainerWave from "./containerWave";
import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
};

const FormGrey = ({ children, title }: Props) => {
  return (
    <div className=" mx-auto rounded-lg bg-white-1 text-black shadow-md transition-all xs:w-full sm:w-9/12 md:w-5/12">
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
