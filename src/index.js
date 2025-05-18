import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import cors from "cors";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";


App.use(cors({
  origin: "https://algo-dev-freaks-git-main-saurabh19062003dwivedis-projects.vercel.app/",
  credentials: true,
}));

const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
  </Provider>
    
    
  </React.StrictMode>
);
