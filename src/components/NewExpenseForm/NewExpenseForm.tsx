import React from "react";
import styles from './NewExpenseForm.module.scss'

function NewExpenseForm() {
    return (
        <div className={styles.form}>
            <form>
                <input
                    type="text"
                    name="expense_title"
                    placeholder="expense title"
                />
                <input
                    type="number"
                    name="expense_amount"
                    placeholder="expense amount"
                />
            </form>
        </div>
    );
}

export default NewExpenseForm;
