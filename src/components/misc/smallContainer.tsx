import React from "react";
import ContainerWave from "./containerWave";

type Props = {
  children?: React.ReactNode;
  title: string;
  extraClass?: string;
};

const SmallContainer = ({ children, title, extraClass }: Props) => {
  return (
    <div
      className={"rounded-md bg-white text-black shadow-md " + extraClass}
      title={title}
    >
      <div className="p-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="max-h-40 overflow-y-auto">{children}</div>
      </div>
      <ContainerWave color="#D9D9D9" className="mt-2 rounded-lg" />
    </div>
  );
};

export default SmallContainer;
