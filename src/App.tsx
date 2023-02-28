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
import { app, database } from "../src/firebase/firebase-config";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import AuthContextProvider, { AuthContext } from "./Auth/AuthContext";
import Authentication from "./pages/Authentication/Authentication";
import { child, get, ref } from "firebase/database";
import { async } from "@firebase/util";
import UserProfile from "./pages/UserProfile/UserProfile";

function getUser() {
    let user = localStorage.getItem("user");
    let auth = getAuth(app);
    console.log("usr =", auth.currentUser);

    if (user) {
        console.log("user in getuser =", user);

        return null;
    }
    console.log("user in getuser =", user);

    return redirect("/login");
}

async function fetchExpenseList() {
    const dbRef = ref(database);
    let user = JSON.parse(localStorage.getItem("user")!) as User;

    let snapshot = await get(child(dbRef, `users/${user?.uid}/expenses`));
    if (await snapshot.exists()) {
        console.log(await Object.values(snapshot.val()));
        return await Object.values(snapshot.val());
    } else {
        return await [];
    }
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: () => {
            return getUser();
        },
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
                path: "/profile",
                element: <UserProfile />,
            },
        ],
    },
    {
        path: "/login",
        element: <Authentication />,
    },
]);
function App(): any {
    return <RouterProvider router={router} />;
}

export default App;
