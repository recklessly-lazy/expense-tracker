import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

import styles from "./ExpensesList.module.scss";

function ExpensesList() {
    const expenses = useAppSelector((state) => state.expenses);
    const dispatch = useAppDispatch();
    return (
        <div className={styles.listContainer}>
            {expenses.expenses.length === 0 ? (
                <h3>No Transactions found.</h3>
            ) : null}
            {expenses.expenses.map((expense) => (
                <ExpenseItem key={expense.title} expense={expense} />
            ))}
        </div>
    );
}

export default ExpensesList;
