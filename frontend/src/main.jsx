import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { JobProvider } from "./context/JobProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <JobProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </JobProvider>
    </AuthProvider>
  </BrowserRouter>
);
