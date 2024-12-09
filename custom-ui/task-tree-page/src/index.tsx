// eslint-disable-next-line no-use-before-define
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "@atlaskit/css-reset";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  rootElement.style.height = "100%";
  rootElement.style.width = "100%";
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
