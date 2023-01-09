import React, { useState } from "react";
import styles from "./ExpensePage.module.scss";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import NewExpenseForm from "../../components/NewExpenseForm/NewExpenseForm";

function ExpensePage() {
    const [showExpenseform, setShowExpenseform] = useState(false);
    const toggleAddExpenseForm = () => {
        setShowExpenseform((prevState) => !prevState);
    };
    return (
        <div className={styles.expensePage}>
            <ExpensesList />
            <NewExpenseForm show={showExpenseform} />
            <button className={styles.addBtn} onClick={toggleAddExpenseForm}>
                {!showExpenseform ? (
                    <i className="bi bi-plus" style={{ fontSize: "2rem" }}></i>
                ) : (
                    <i className="bi bi-x"style={{fontSize: '2rem'}} ></i>
                )}
            </button>
        </div>
    );
}

export default ExpensePage;
