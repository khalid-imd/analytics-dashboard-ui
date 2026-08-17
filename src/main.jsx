import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Global styles

// Target the HTML element with the id 'root'
const container = document.getElementById("root");

// Create the React root and render the application
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
