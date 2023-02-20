import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./ExpensePage.module.scss";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import NewExpenseForm from "../../components/NewExpenseForm/NewExpenseForm";
import { motion } from "framer-motion";

import { AuthContext } from "../../Auth/AuthContext";
import { useAppDispatch } from "../../hooks/hooks";
import axios from "axios";
import { initExpenses } from "../../reducers/ExpenseListReducer";
import { getAuth } from "firebase/auth";
import { app, database } from "../../firebase/firebase-config";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Expense } from "../../models/Expense";
import { onValue, ref } from "firebase/database";

function ExpensePage() {
    const context = useContext(AuthContext);
    console.log("!context?.user ", !context?.user);
    console.log("context ===", context);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [expensesLoading, setExpensesLoading] = useState(true);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user")!);
        console.log("user =", user);
        if (user) {
            setExpensesLoading(true);
            let expRef = ref(database, "/users/" + user?.uid + "/expenses");
            onValue(expRef, (snapshot) => {
                let allExpense: Array<Expense> = [];
                const data = snapshot.val();
                console.log("data =", data);
                if (data !== null) {
                    let expenses = Object.values(data);
                    console.log("expenses = ", expenses);
                    // allExpense = expenses as Array<Expense>;
                    for (let exp of expenses) {
                        allExpense.push(exp as Expense);
                    }
                }
                console.log("all expenses ===", allExpense);
                dispatch(initExpenses(allExpense));
                setExpensesLoading(false);
            });
        }
    }, []);

    const [showExpenseform, setShowExpenseform] = useState(false);
    const toggleAddExpenseForm = () => {
        setShowExpenseform((prevState) => !prevState);
    };
    const nodeRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    return (
        <div className={styles.expensePage} ref={nodeRef}>
            <ExpensesList isLoading={expensesLoading} />
            <NewExpenseForm
                onExpenseAdd={() => {
                    setShowExpenseform(false);
                }}
                show={showExpenseform}
            />
            <motion.button
                className={styles.addBtn}
                onClick={!dragging ? toggleAddExpenseForm : () => {}}
                drag
                dragConstraints={nodeRef}
                onDragStart={() => {
                    setDragging(true);
                    console.log("dragging start");
                }}
                onDragEnd={() => {
                    setDragging(false);
                    console.log("dragging stop");
                }}
                dragTransition={{
                    min: 0,
                    max: 100,
                    bounceDamping: 20,
                    bounceStiffness: 800,
                    power: 0.1,
                }}
            >
                <i
                    className={`bi bi-plus ${
                        showExpenseform ? styles.btnRotate : ""
                    }`}
                    style={{
                        fontSize: "2rem",
                        transition: "all 0.5s ease 0s",
                        display: "block",
                    }}
                ></i>
            </motion.button>
        </div>
    );
}

export default ExpensePage;
