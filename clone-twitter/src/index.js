import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

console.log(process.env.REACT_APP_APP_ID);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
