import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import * as React from "react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
    <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>
);


