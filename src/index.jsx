import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./second.css";

const root = document.getElementById('root');

const container = createRoot(root);

container.render(<App />);
