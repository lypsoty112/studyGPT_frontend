import React, { useEffect, useState } from "react";
import ContainerWave from "./containerWave";
import FormLoader from "./loaders";

type Props = {
  children?: React.ReactNode;
  title: string;
  extraClass?: string;
  loading?: boolean;
};

const SmallContainer = ({ children, title, extraClass, loading }: Props) => {
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setLoadingState(loading || false);
  }, [loading]);

  const loadingTitle = <FormLoader rectangleCount={1}></FormLoader>;
  const loadingBody = <FormLoader rectangleCount={4}></FormLoader>;

  return (
    <div
      className={
        "animated-inactive rounded-md bg-white text-black " + extraClass
      }
      title={title}
    >
      <div className="p-2">
        <div>
          <h1 className="text-2xl font-bold">
            {loadingState ? loadingTitle : title}
          </h1>
        </div>
        <div className="max-h-40 overflow-y-auto">
          {loadingState ? loadingBody : children}
        </div>
      </div>
      <ContainerWave color="#D9D9D9" className="mt-2 rounded-lg" />
    </div>
  );
};

export default SmallContainer;
