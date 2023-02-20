import React, { useState } from "react";
import { Expense } from "../../models/Expense";
import styles from "./ExpenseItem.module.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { removeExpense } from "../../reducers/ExpenseListReducer";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { app, database } from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";

const DateComp = ({ dateStr }: { dateStr: string }) => {
    let date = new Date(dateStr);
    return (
        <>
            <div className={styles.dateComp}>
                <span>{date.toLocaleString("en-US", { month: "short" })}</span>
                <span>{date.toLocaleString("en-US", { year: "numeric" })}</span>
                <span>{date.toLocaleString("en-US", { day: "2-digit" })}</span>
            </div>
        </>
    );
};

function ExpenseItem({ expense }: { expense: Expense }) {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const deleteExpense = (isConfirmed: boolean = false) => {
        if (isConfirmed) {
            let user = getAuth(app).currentUser;
            if (user) {
                let rmref = ref(
                    database,
                    "/users/" + user?.uid + `/expenses/${expense.id}`
                );
                remove(rmref)
                dispatch(removeExpense(expense));
            }
        }
        setShowModal(false);
    };
    return (
        <>
            <ConfirmationModal
                item={expense.title}
                show={showModal}
                confirm={deleteExpense}
            />
            <div className={styles.expenseItem}>
                {/* <div className="d-flex flex-row justify-content-between container"> */}
                <div
                    onClick={() => {
                        navigate(`expenses/${expense.id}`);
                    }}
                    className={`d-flex flex-column justify-content-evenly align-items-center w-100 ${styles.dateAndTitle}`}
                >
                    <DateComp dateStr={expense.date} />
                    <h4 className="mb-0">{expense.title}</h4>
                </div>
                <div className="w-100 pt-3 mb-0 d-flex flex-row justify-content-end align-items-center">
                    <strong className="pe-4">&#8377;{expense.amount}</strong>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => {
                            console.log("oops ! inside onclick ");
                            setShowModal(true);
                        }}
                    >
                        {" "}
                        <i className="bi bi-trash3-fill text-danger"></i>{" "}
                    </button>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default ExpenseItem;
