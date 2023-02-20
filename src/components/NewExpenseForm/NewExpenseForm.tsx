import React, { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./NewExpenseForm.module.scss";
import Form from "react-bootstrap/Form";
import BackDrop from "../Backdrop/BackDrop";
import { Expense } from "../../models/Expense";
import { useAppDispatch } from "../../hooks/hooks";
import { addExpense } from "../../reducers/ExpenseListReducer";
import { v4 as uuidv4 } from "uuid";
import { push, ref, remove, set } from "firebase/database";
import { database } from "../../firebase/firebase-config";
import { AuthContext } from "../../Auth/AuthContext";
function NewExpenseForm({
    show,
    onExpenseAdd,
}: {
    show: boolean;
    onExpenseAdd: Function;
}) {
    console.log("show =", show);

    let context = useContext(AuthContext);

    const [render, setRender] = useState(show);
    const [expenseTitle, setExpenseTitle] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");

    const [expenseTitleErr, setExpenseTitleErr] = useState("");
    const [expenseAmountErr, setExpenseAmountErr] = useState("");
    const [expenseDateErr, setExpenseDateErr] = useState("");

    const [expenseTitleTouched, setExpenseTitleTouched] = useState("");
    const [expenseAmountTouched, setExpenseAmountTouched] = useState("");
    const [expenseDateTouched, setExpenseDateTouched] = useState("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (show) setRender(show);
    }, [show]);

    function clearFormData() {
        setExpenseTitle("");
        setExpenseAmount(0);
        setExpenseDate("");
    }

    function validateForm() {
        console.log(
            "title:",
            expenseTitle === "",
            ", amt:",
            expenseAmount,
            ", date:",
            expenseDate
        );
        let isFormValid = true;
        let isTitleEmpty = expenseTitle === "";
        console.log("istitle ===", isTitleEmpty);

        if (isTitleEmpty) {
            console.log("istitle ===", isTitleEmpty);
            setExpenseTitleErr((prev) => "Expense title cannot be empty !");
            isFormValid = false;
        } else {
            setExpenseTitleErr("");
        }
        if (isNaN(expenseAmount) || expenseAmount === 0) {
            setExpenseAmountErr("Expense amount can't be left empty");
            isFormValid = false;
        } else {
            setExpenseAmountErr("");
        }

        if (!(expenseDate === "")) {
            let date = new Date(expenseDate);
            let now = new Date();
            let diffDays =
                (date.valueOf() - now.valueOf()) / (1000 * 60 * 60 * 24);

            if (diffDays > 0) {
                setExpenseDateErr("Date can't be in the future !");
                isFormValid = false;
            } else {
                setExpenseDateErr("");
            }
        } else {
            setExpenseDateErr("Date can't be empty");
            isFormValid = false;
        }

        console.log(
            "expenseTitleErr:",
            expenseTitleErr,
            ", expenseAmountErr",
            expenseAmountErr,
            ", expenseDateErr",
            expenseDateErr
        );
        return isFormValid;
    }

    function addNewExpense(expense: Expense) {
        // let expenseRef = push(
        let expenseRef = ref(
            database,
            `/users/${context?.user?.uid}/expenses/${expense.id}`
        );

        set(expenseRef, expense);
        remove;
    }
    function addExpenseHandler(event: FormEvent) {
        event.preventDefault();
        let newExpense: Expense;
        let isValid = validateForm();
        console.log("is form valid ?", isValid);
        if (isValid) {
            newExpense = {
                id: uuidv4(),
                amount: expenseAmount,
                title: expenseTitle,
                date: expenseDate,
                description: expenseDescription,
            };
            console.log("newExp = ", newExpense);
            console.log("date ===", new Date(newExpense.date));
            addNewExpense(newExpense);
            // dispatch(addExpense(newExpense));
            onExpenseAdd();
            clearFormData();
        } else {
            return;
        }
    }
    const classes = [styles.form, show ? styles.entry : styles.exit].join(" ");
    console.log("classes = ", classes);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e: any) => {
        //  alert("touch started")
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isUpSwipe = distance > minSwipeDistance;
        const isDownSwipe = distance < -minSwipeDistance;
        if (isDownSwipe || isUpSwipe)
            console.log("swipe", isDownSwipe ? "down" : "up");
        // add your conditional logic here
        if (isDownSwipe) {
            // alert(`touchstart = ${touchStart}, touchend = ${touchEnd}`);
            onExpenseAdd();
        }
    };
    let content = (
        <>
            <BackDrop show={show} onBackdropClick={onExpenseAdd} />
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={classes}
                onAnimationEnd={() => {
                    console.log("inside animation end");
                    if (!show) setRender(false);
                }}
            >
                <form
                    className={"pb-2" + " " + styles.formBody}
                    onSubmit={addExpenseHandler}
                >
                    <div className={styles.formHeader}>
                        <strong>New Expense</strong>
                    </div>
                    <div className={styles.bodyContent}>
                        <div className="pb-3">
                            <label
                                className="form-label"
                                htmlFor="expense_title"
                            >
                                Expense title
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="expense_title"
                                name="expense_title"
                                placeholder="expense title"
                                onChange={(e) =>
                                    setExpenseTitle(e.target.value)
                                }
                            />
                            <div className="text-danger">{expenseTitleErr}</div>
                        </div>
                        <div className="pb-3">
                            <label
                                className="form-label"
                                htmlFor="expense_amount"
                            >
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
                            <div className="text-danger">
                                {expenseAmountErr}
                            </div>
                        </div>
                        <div className="pb-3">
                            <label
                                className="form-label"
                                htmlFor="expense_amount"
                            >
                                Date
                            </label>
                            <input
                                className="form-control"
                                type="date"
                                id="expense_date"
                                name="expense_date"
                                onChange={(e) => setExpenseDate(e.target.value)}
                            />
                            <div className="text-danger">{expenseDateErr}</div>
                        </div>
                        <div className="pb-3">
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                name="description"
                                id="description"
                                cols={10}
                                rows={3}
                                onChange={(e) =>
                                    setExpenseDescription(e.target.value)
                                }
                            ></textarea>
                            {/* <input
                            className="form-control"
                            type="date"
                            id="expense_date"
                            name="expense_date"
                            onChange={(e) => setExpenseDate(e.target.value)}
                        /> */}
                            {/* <div className="text-danger">{expenseDateErr}</div> */}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

    return <>{render && content}</>;
}

export default NewExpenseForm;
