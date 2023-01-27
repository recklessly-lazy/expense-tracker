import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Layout from "./Layout/Layout";
import ExpensePage from "./pages/ExpensePage/ExpensePage";

import {
    createBrowserRouter,
    redirect,
    RouterProvider,
    useNavigate,
} from "react-router-dom";
import ExpenseDetail from "./pages/ExpenseDetailPage/ExpenseDetailPage";
import axios from "axios";
import { initExpenses } from "./reducers/ExpenseListReducer";
import { useAppDispatch } from "./hooks/hooks";
import { app } from "../src/firebase/firebase-config";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import AuthContextProvider, { AuthContext } from "./Auth/AuthContext";
import Authentication from "./pages/Authentication/Authentication";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ExpensePage />,
            },
            {
                path: "/expenses/:expenseId",
                element: <ExpenseDetail />,
            },
            {
                path: "/login",
                element: <Authentication />,
            },
        ],
    },
]);

function App(): any {
    //initializing expenses from mock db json


    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
}

export default App;
