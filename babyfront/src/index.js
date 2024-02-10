import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import * as React from "react";
import AuthProvider from "./provider/authProvider.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(


    <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
              
            </AuthProvider>
        

);


