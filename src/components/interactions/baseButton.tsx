import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  color: number;
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
  args?: any;
};

const BaseButton = ({ color, onClick, loading, children, args }: Props) => {
  let colorClass = "";
  let loaderColor = "";
  switch (color) {
    case 1:
      colorClass = "bg-green-1 text-white";
      loaderColor = "#ffffff";
      break;
    case 2:
      colorClass = "bg-gray-1 text-black";
      loaderColor = "#000000";
      break;
    default:
      colorClass = "bg-white text-black";
      loaderColor = "#000000";
      break;
  }

  const [loadingState, setLoadingState] = useState(loading);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading]);

  // If loading is true, display a loading animation using BeatLoader from react-spinners
  const loadingSpinner = (
    <div className="flex items-center justify-center">
      <BeatLoader color={loaderColor} loading={loadingState} />
    </div>
  );

  return (
    <button
      className={colorClass + " animated-base rounded-lg px-6 py-4 font-medium"}
      onMouseDown={onClick}
      {...args}
    >
      {loading ? loadingSpinner : children}
    </button>
  );
};

export default BaseButton;
