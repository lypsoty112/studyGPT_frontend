import React, { useState } from "react";
import ContainerWave from "./containerWave";

type Props = {
  title: string;
  onClick: () => void;
  date: string;
  description: string;
};

const SummaryButton: React.FC<Props> = ({
  title,
  onClick,
  date,
  description,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative my-4 w-full sm:w-1/2 md:w-1/5">
      <div
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="animated-base relative mx-auto w-10/12 cursor-pointer rounded bg-gray-1 "
        title={description}
      >
        <div className="px-2 pt-2">
          <div className="mb-7 text-lg font-medium">{title}</div>
          <div className="text-xs italic">{date}</div>
        </div>
        <div
          className={
            "absolute bottom-0 h-full w-full overflow-hidden rounded bg-gray-1 px-2 py-1 text-sm text-black transition-all duration-200 " +
            (hover ? "opacity-100" : "opacity-0")
          }
        >
          {description}
        </div>
        <ContainerWave
          color={hover ? "" : "#00B300"}
          className="h-1/10 w-full transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SummaryButton;
