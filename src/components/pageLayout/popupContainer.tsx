import React from "react";

type Props = {
  children: React.ReactNode;
  display: boolean;
};

const PopupContainer = ({ children, display }: Props) => {
  return (
    <div
      className={
        "bottom-0 left-0 z-10 h-screen w-screen overflow-y-auto bg-black bg-opacity-20 p-1 sm:p-5 " +
        (display ? "absolute" : "hidden")
      }
    >
      {children}
    </div>
  );
};

export default PopupContainer;
