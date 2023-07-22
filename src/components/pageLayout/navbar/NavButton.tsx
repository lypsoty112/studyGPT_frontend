import React, { useState } from "react";

type Props = {
  displayText: string;
  onClick: () => void;
};

const NavButton = ({ displayText, onClick }: Props) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <div>
      <button
        className={`cursor-pointer rounded p-2 text-base font-medium text-black-1 transition-all  ${
          hover ? "shadow-lg transition-all  duration-300" : ""
        }`}
        onMouseDown={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {displayText}
      </button>
    </div>
  );
};

export default NavButton;
