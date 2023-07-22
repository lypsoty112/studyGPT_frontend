import React from "react";

type Props = {
  children?: React.ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col bg-gradient-green-white">
      {children}
    </div>
  );
};

export default MainContainer;
