import ContainerTitle from "./containerTitle";
import ContainerWave from "./containerWave";
import React from "react";
import FormLoader from "@/components/misc/loaders";

type Props = {
  children?: React.ReactNode;
  title: string;
  width?: string;
  loading?: boolean;
  color?: number;
};

const Form = ({ children, title, width, loading, color }: Props) => {
  // Check if the width is defined
  if (!width) {
    width = "xs:w-full sm:w-9/12 md:w-5/12";
  }

  if (!color) color = 0;

  const colors = ["bg-white-1 text-black", "bg-green-1 text-white"];

  const loader = <FormLoader></FormLoader>;
  return (
    <div
      className={`animated-inactive mx-auto rounded-lg ${colors[color]} ${width}`}
    >
      <div className="px-12 py-8">
        <ContainerTitle title={title} />
        <div>{loading ? loader : children}</div>
      </div>
      <div>
        <ContainerWave color="#D9D9D9" className="mt-2 rounded-lg" />
      </div>
    </div>
  );
};

export default Form;
