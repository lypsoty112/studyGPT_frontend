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
    default:
      colorClass = "bg-white text-black";
      break;
  }
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <button
      className={
        colorClass +
        " rounded-lg px-6 py-4 font-medium shadow-md transition-all" +
        (hover ? " shadow-xl transition-all  duration-300" : "")
      }
      onMouseDown={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
};

export default BaseButton;
