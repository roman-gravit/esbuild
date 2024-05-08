import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./second.css";

const root = document.getElementById('root') as HTMLElement;

const container = createRoot(root);

container.render(<App />);
