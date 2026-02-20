// this is the entry point of the app 

import React from "react"; // importing react and react dom because it it will render our react app and broswer router to do routing 
import ReactDOM from "react-dom/client"; // 
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
