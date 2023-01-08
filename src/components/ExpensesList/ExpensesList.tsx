import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

function ExpensesList() {
    const expenses = useAppSelector((state) => state.expenses);
    const dispatch = useAppDispatch();
    return (
        <div>
            {expenses.expenses.map((expense) => (
                <ExpenseItem expense={expense} />
            ))}
        </div>
    );
}

export default ExpensesList;
