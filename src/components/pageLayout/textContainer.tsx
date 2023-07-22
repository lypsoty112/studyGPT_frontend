import React from "react";
import ContainerTitle from "../misc/containerTitle";
import ContainerWave from "../misc/containerWave";

type Props = {
  children: React.ReactNode;
  widthClass?: string;
  title: string;
};

const TextContainer = ({ children, widthClass, title }: Props) => {
  return (
    <div
      className={
        widthClass +
        " mx-auto rounded-lg bg-white-1 text-black shadow-md transition-all "
      }
    >
      <div className="px-12 py-8">
        <ContainerTitle title={title} />
        <div>{children}</div>
      </div>
      <div>
        <ContainerWave color="#D9D9D9" className="mt-2 h-12 w-full" />
      </div>
    </div>
  );
};

export default TextContainer;
