export { compareHtml } from "./html-comparer";
import React from "react";
import ReactDOM from "react-dom/server";

export const SpecToHtml = (SpecFile, options = {}) => {
  // <SpecFile {...options} />
  return ReactDOM.renderToStaticMarkup(React.createElement(SpecFile, options));
};
