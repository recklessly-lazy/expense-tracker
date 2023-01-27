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
import { app } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

function ExpensePage() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
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
        if (!context.isLoggedIn) {
            console.log("not logged in ");
            navigate("/login");
        }
        let auth = getAuth(app);
        console.log("auth instance of firebase ===", auth);

        fetchExpenses();
    }, []);
    //init end
    const [showExpenseform, setShowExpenseform] = useState(false);
    const toggleAddExpenseForm = () => {
        setShowExpenseform((prevState) => !prevState);
    };
    const nodeRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    return (
        <div className={styles.expensePage} ref={nodeRef}>
            <ExpensesList />
            <NewExpenseForm
                onExpenseAdd={() => {
                    setShowExpenseform(false);
                }}
                show={showExpenseform}
            />
            <motion.button
                className={styles.addBtn}
                onClick={
                    !dragging
                        ? toggleAddExpenseForm
                        : () => {
                              setDragging(false);
                          }
                }
                drag
                dragConstraints={nodeRef}
                onDragStart={() => {
                    setDragging(true);
                    console.log("dragging start");
                }}
                dragTransition={{
                    min: 0,
                    max: 100,
                    bounceDamping: 20,
                    bounceStiffness: 800,
                    power: 0.1,
                }}
            >
                {/* {!showExpenseform ? (
                ) : (
                    <i className="bi bi-x" style={{ fontSize: "2rem" }}></i>
                )} */}
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
