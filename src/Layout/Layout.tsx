import React, { ReactNode, useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { Spinner } from "react-bootstrap";
import { database } from "../firebase/firebase-config";
import { child, get, ref } from "firebase/database";
import { BaseLayout } from "./BaseLayout";
import { useAppDispatch } from "../hooks/hooks";
import { Expense } from "../models/Expense";
import { initExpenses } from "../reducers/ExpenseListReducer";
import SideNav from "../components/SideNav/SideNav";

function Layout() {
    const dispatch = useAppDispatch();
    // const data = useLoaderData() as Array<Expense>;
    // useEffect(() => {
    //     dispatch(initExpenses(data));
    // }, []);
    return (
        <BaseLayout>
            <Outlet />
        </BaseLayout>
    );
}

export default Layout;

{
    /* {(context?.isAuthPending && !context?.isLoggedIn)? (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <div style={{ paddingBottom: "250px" }}>
                <Spinner animation="border" />
            </div>
        </div>
    ) : ( */
}
{
    /* )} */
}
