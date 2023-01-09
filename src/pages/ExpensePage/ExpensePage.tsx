import React from "react";
import styles from "./ExpensePage.module.scss";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import NewExpenseForm from "../../components/NewExpenseForm/NewExpenseForm";

function ExpensePage() {
    return (
        <div className={styles.expensePage}>
            <ExpensesList />
            <NewExpenseForm />
            {/* <Expe */}
        </div>
    );
}

export default ExpensePage;
