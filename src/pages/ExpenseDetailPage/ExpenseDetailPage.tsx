import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

import styles from "./ExpenseDetailPage.module.scss";
import { Expense } from "../../models/Expense";

type params = {
    expenseId?: string;
};

const ExpenseDetailItem = ({ expense }: { expense?: Expense }) => {
    return (
        <div className={styles.expenseDetailItem}>
            <h4
                className="pb-4 ps-0"
                style={{
                    textAlign: "center",
                }}
            >
                {expense?.title} details
            </h4>
            <div className="d-flex flex-row pb-4">
                <span className={styles.label}>
                    <strong>Title:</strong>
                </span>{" "}
                <span className={styles.value}>{expense?.title}</span>
            </div>
            <div className="d-flex flex-row pb-4">
                <span className={styles.label}>
                    <strong>Amount:</strong>
                </span>{" "}
                <span className={styles.value}>{expense?.amount}</span>
            </div>
            <div className="d-flex flex-row pb-4">
                <span className={styles.label}>
                    <strong>Spent on:</strong>
                </span>{" "}
                <span className={styles.value}>{expense?.date}</span>
            </div>
            <div className="d-flex flex-row pb-4">
                <span className={styles.label}>
                    <strong>Description:</strong>
                </span>{" "}
                <span className={styles.value}>{expense?.description}</span>
            </div>
            {/* <div className="d-flex flex- justify-content-between">
                <span>Title:</span> <span>{expense?.title}</span>
            </div> */}
        </div>
    );
};

function ExpenseDetailPage() {
    const { expenseId } = useParams<params>();
    const navigate = useNavigate()
    const expense = useAppSelector((state) => state.expenses.expenses).find(
        (exp) => exp.id === expenseId
    );

    if (expense)
        return (
            <div className={styles.expenseDetailPage}>
                <ExpenseDetailItem expense={expense} />
            </div>
        );
    else {
        navigate("/")
        return null
    }
}

export default ExpenseDetailPage;
