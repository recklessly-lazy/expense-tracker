import React, { FormEvent, useState } from "react";
import styles from "./NewExpenseForm.module.scss";
import Form from "react-bootstrap/Form";
import BackDrop from "../Backdrop/BackDrop";

function NewExpenseForm({ show }: { show: boolean }) {
    const [expenseTitle, setExpenseTitle] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);

    function addExpenseHandler(event: FormEvent) {
        event.preventDefault();
    }
    let content = (
        <>
            <BackDrop onClick={()=>{}}/>
            <div className={styles.form}>
                <form className="pb-2" onSubmit={addExpenseHandler}>
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
                            onChange={(e) =>
                                setExpenseAmount(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
    return <>{show ? content : null}</>;
}

export default NewExpenseForm;
