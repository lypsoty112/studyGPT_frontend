import React from "react";
import ReactMarkdown from "react-markdown";
import "./markdownRenderer.css";

interface Props {
  markdown: string;
}

const MarkdownRenderer: React.FC<Props> = ({ markdown }) => (
  <div className="md">
    <ReactMarkdown>{markdown}</ReactMarkdown>
  </div>
);

export default MarkdownRenderer;
