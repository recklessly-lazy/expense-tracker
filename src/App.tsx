import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Layout from "./Layout/Layout";
import ExpensePage from "./pages/ExpensePage/ExpensePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExpenseDetail from "./pages/ExpenseDetailPage/ExpenseDetailPage";
import axios from "axios";
import { initExpenses } from "./reducers/ExpenseListReducer";
import { useAppDispatch } from "./hooks/hooks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ExpensePage />,
        // children: [
        //     {
        //         path: "subroute",
        //         element: (function () {
        //             console.log("inside subroute !!!!!");

        //             return (
        //                 <>
        //                     <h4>Sub route checkn</h4>
        //                 </>
        //             );
        //         })(),
        //     },
        // ],
    },
    {
        path: "expenses/:expenseId",
        element: <ExpenseDetail />,
    },
]);

function App(): any {

    //initializing expenses from mock db json

    const dispatch = useAppDispatch();
    async function fetchExpenses() {
        console.log("inside useEffect of EXPLIST");

        const fetchData = async () => {
            const data = await axios.get("/src/db/db.json");
            const expenses = data.data;
            console.log(expenses);
            dispatch(initExpenses(expenses.expenses));
        };
        fetchData();
    }
    useEffect(() => {
        fetchExpenses();
    }, []);
    //init end


    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    );
}

export default App;
