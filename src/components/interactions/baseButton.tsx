import React from "react";
import { useState } from "react";

type Props = {
  color: Number;
  onClick: () => void;
  /*----------------------------------------*/
  children: React.ReactNode;
};

const BaseButton = ({ color, onClick, children }: Props) => {
  // Create a color based on a switch statement
  let colorClass = "";
  switch (color) {
    case 1:
      colorClass = "bg-green-1 text-white";
      break;
    case 2:
      colorClass = "bg-gray-1 text-black";
      break;
    default:
      colorClass = "bg-white text-black";
      break;
  }
  return (
    <button
      className={colorClass + " animated-base rounded-lg px-6 py-4 font-medium"}
      onMouseDown={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;
