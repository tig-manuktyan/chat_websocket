import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Replace with the path to your main component file
import registerServiceWorker from "./lib/socket/registerServiceWorker";
import { AuthContextProvider } from "./context";
import { BrowserRouter as Router } from "react-router-dom";
const root = document.getElementById("root");

// Replace ReactDOM.render with createRoot().render
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>
);
registerServiceWorker();
