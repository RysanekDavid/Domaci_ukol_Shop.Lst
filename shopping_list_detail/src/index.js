import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./components/DarkMode/DarkMode";
import "./components/i18n/i18n.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
