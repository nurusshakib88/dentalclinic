import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { ServiceProvider } from "./context/ServiceContext.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <AppointmentProvider>
        <ServiceProvider>
          <App />
        </ServiceProvider>
      </AppointmentProvider>
    </LoginProvider>
  </React.StrictMode>
);
