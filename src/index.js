import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from "@speechly/react-client";
import Provider from "./context/context";

import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <SpeechProvider appId="5f167f5f-b3cc-49e7-bcf7-615f50b437ca" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  rootElement
);
