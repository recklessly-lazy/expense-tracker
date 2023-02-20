import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

import empty from "../../assets/empty-box-5342761-4468833.jpg";

import styles from "./ExpensesList.module.scss";
import axios from "axios";
import { initExpenses } from "../../reducers/ExpenseListReducer";
import { Spinner } from "react-bootstrap";

function ExpensesList({ isLoading }: { isLoading: boolean }) {
    const expenses = useAppSelector((state) => state.expenses);

    if (isLoading) {
        return (
            <div className={styles.listContainer} style={{justifyContent: 'center'}}>
                <Spinner animation="border" />
            </div>
        );
    }
    console.log("expenses in expenseList ===",expenses);
    
    if (expenses && expenses.expenses) {
        return (
            <div className={styles.listContainer}>
                {expenses.expenses.length === 0 ? (
                    <>
                        {" "}
                        <h3>No Transactions found.</h3>
                        <center>
                            {" "}
                            {/* <i className="bi bi-trash3-fill" style={{fontSize: '100px'}}></i>{" "} */}
                            <img style={{ maxWidth: "100%" }} src={empty} />
                        </center>
                    </>
                ) : null}
                {expenses.expenses.map((expense) => (
                    <ExpenseItem key={expense.id} expense={expense} />
                ))}
            </div>
        );
    }

    return null;
}

export default ExpensesList;
