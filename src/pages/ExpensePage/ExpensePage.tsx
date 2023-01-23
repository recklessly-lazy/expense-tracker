import React, { useRef, useState } from "react";
import styles from "./ExpensePage.module.scss";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import NewExpenseForm from "../../components/NewExpenseForm/NewExpenseForm";
import { motion } from "framer-motion";
function ExpensePage() {
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
                    bounceStiffness: 500,
                    power: 0.2,
                    
                }}
            >
                {!showExpenseform ? (
                    <i className="bi bi-plus" style={{ fontSize: "2rem" }}></i>
                ) : (
                    <i className="bi bi-x" style={{ fontSize: "2rem" }}></i>
                )}
            </motion.button>
        </div>
    );
}

export default ExpensePage;
