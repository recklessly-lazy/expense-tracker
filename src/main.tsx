import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css"
import $ from "jquery";
import Popper from "popper.js";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthContextProvider from "./Auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AuthContextProvider>
    </React.StrictMode>
);
