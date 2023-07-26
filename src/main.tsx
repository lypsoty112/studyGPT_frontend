import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MyAuth0Provider from "./api/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyAuth0Provider>
      <App />
    </MyAuth0Provider>
  </React.StrictMode>
);
