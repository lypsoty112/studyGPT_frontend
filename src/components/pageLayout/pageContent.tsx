import React from "react";

type Props = {
  children?: React.ReactNode;
};

const PageContent = ({ children }: Props) => {
  return <main className="mb-1 flex-grow p-5">{children}</main>;
};

export default PageContent;
