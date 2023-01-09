import { useRef, useState } from "react";
import { Expense } from "../../models/Expense";
import styles from "./ExpenseItem.module.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { removeExpense } from "../../reducers/ExpenseListReducer";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CSSTransition } from "react-transition-group";

function ExpenseItem({ expense }: { expense: Expense }) {
    const nodeRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const deleteExpense = (isConfirmed: boolean) => {
        if (isConfirmed) dispatch(removeExpense(expense));
        setShowModal(false);
    };
    return (
        <>
            {showModal && (
                <CSSTransition
                    in
                    mountOnEnter
                    unmountOnExit
                    timeout={1000}
                    nodeRef={nodeRef}
                    classNames={{
                        enter: styles.modal,
                        exit: styles.modalExit,
                    }}
                    addEndListener={() => {}}
                >
                    <ConfirmationModal ref={nodeRef} confirm={deleteExpense} />
                </CSSTransition>
            )}
            <div className={styles.expenseItem}>
                <div className="d-flex flex-row justify-content-between container">
                    <h4 className="mb-0">{expense.title}</h4>
                    <div className="mb-0 d-flex flex-row justify-content-between align-items-center">
                        <strong className="pe-4">
                            &#8377;{expense.amount}
                        </strong>
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
            </div>
        </>
    );
}

export default ExpenseItem;
