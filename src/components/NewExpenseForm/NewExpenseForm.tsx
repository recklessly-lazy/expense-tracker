import React, { FormEvent, useEffect, useState } from "react";
import styles from "./NewExpenseForm.module.scss";
import Form from "react-bootstrap/Form";
import BackDrop from "../Backdrop/BackDrop";
import { Expense } from "../../models/Expense";
import { useAppDispatch } from "../../hooks/hooks";
import { addExpense } from "../../reducers/ExpenseListReducer";
import { v4 as uuidv4 } from "uuid";
function NewExpenseForm({
    show,
    onExpenseAdd,
}: {
    show: boolean;
    onExpenseAdd: Function;
}) {
    console.log("show =", show);

    const [render, setRender] = useState(show);
    const [expenseTitle, setExpenseTitle] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (show) setRender(show);
    }, [show]);

    function addExpenseHandler(event: FormEvent) {
        event.preventDefault();
        let newExpense: Expense = {
            id: uuidv4(),
            amount: expenseAmount,
            title: expenseTitle,
            date: expenseDate,
        };
        console.log("newExp = ", newExpense);
        console.log("date ===", new Date(newExpense.date));
        dispatch(addExpense(newExpense));
        onExpenseAdd();
    }
    const classes = [styles.form, show ? styles.entry : styles.exit].join(" ");
    console.log("classes = ", classes);
    let content = (
        <>
            <BackDrop show={show} onBackdropClick={onExpenseAdd} />
            <div
                className={classes}
                onAnimationEnd={() => {
                    console.log("inside animation end");
                    if (!show) setRender(false);
                }}
            >
                <div className={styles.formHeader}>New Expense</div>
                <form className={"pb-2"+' ' + styles.formBody} onSubmit={addExpenseHandler}>
                    <div className="pb-3">
                        <label className="form-label" htmlFor="expense_title">
                            Expense title
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="expense_title"
                            name="expense_title"
                            placeholder="expense title"
                            onChange={(e) => setExpenseTitle(e.target.value)}
                        />
                    </div>
                    <div className="pb-3">
                        <label className="form-label" htmlFor="expense_amount">
                            Amount
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            id="expense_amount"
                            name="expense_amount"
                            placeholder="expense amount"
                            onChange={(e) =>
                                setExpenseAmount(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="pb-3">
                        <label className="form-label" htmlFor="expense_amount">
                            Date
                        </label>
                        <input
                            className="form-control"
                            type="date"
                            id="expense_date"
                            name="expense_date"
                            onChange={(e) => setExpenseDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
    return <>{render && content}</>;
}

export default NewExpenseForm;
