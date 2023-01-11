import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

import empty from "../../assets/empty-box-5342761-4468833.jpg";

import styles from "./ExpensesList.module.scss";
import axios from "axios";
import { initExpenses } from "../../reducers/ExpenseListReducer";

function ExpensesList() {
    const expenses = useAppSelector((state) => state.expenses);
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

    return (
        <div className={styles.listContainer}>
            {expenses.expenses.length === 0 ? (
                <>
                    {" "}
                    <h3>No Transactions found.</h3>
                    <center>
                        {" "}
                        {/* <i className="bi bi-trash3-fill" style={{fontSize: '100px'}}></i>{" "} */}
                        <img src={empty} />
                    </center>
                </>
            ) : null}
            {expenses.expenses.map((expense) => (
                <ExpenseItem key={expense.title} expense={expense} />
            ))}
        </div>
    );
}

export default ExpensesList;
