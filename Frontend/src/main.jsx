import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
