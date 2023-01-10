import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

import empty from '../../assets/empty-box-5342761-4468833.jpg'

import styles from "./ExpensesList.module.scss";

function ExpensesList() {
    const expenses = useAppSelector((state) => state.expenses);
    const dispatch = useAppDispatch();
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
