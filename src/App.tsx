import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Layout from "./Layout/Layout";
import ExpensePage from "./pages/ExpensePage/ExpensePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExpenseDetail from "./components/ExpenseDetail/ExpenseDetail";

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
        path: "expense/:expenseId",
        element: <ExpenseDetail />,
    },
]);

function App(): any {
    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    );
}

export default App;
