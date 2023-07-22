import React from "react";

type Props = {
  children?: React.ReactNode;
};

const AttentionDiv = ({ children }: Props) => {
  return <div className="mb-3 text-lg font-medium">{children}</div>;
};

export default AttentionDiv;
