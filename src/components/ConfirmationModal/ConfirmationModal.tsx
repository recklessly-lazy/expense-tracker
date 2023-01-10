import { useRef } from "react";
import BackDrop from "../Backdrop/BackDrop";
import styles from "./ConfirmationModal.module.scss";
import { CSSTransition } from "react-transition-group";

export default function ConfirmationModal({
    confirm,
    show,
    item,
}: {
    confirm: Function;
    show: boolean;
    item: string;
}) {
    const nodeRef = useRef(null);
    return (
        <>
            <BackDrop show={show} onBackdropClick={confirm}/>
            <CSSTransition
                in={show}
                mountOnEnter
                unmountOnExit
                timeout={300}
                nodeRef={nodeRef}
                classNames={{
                    enter: styles.modal,
                    enterActive: styles.modal,
                    enterDone: styles.modal,
                    exit: styles.modalExit,
                    exitActive: styles.modal,
                    // exitDone: styles.modalExit,
                }}
                addEndListener={() => {}}
            >
                <div ref={nodeRef} className={styles.modal}>
                    <h6>
                        Are you sure, you want to delete this item:{" "}
                        <strong>{item}</strong>?
                    </h6>
                    <div className="d-flex flex-row w-100 justify-content-between align-items-center pt-4">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                confirm(true);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => {
                                confirm(false);
                            }}
                            className="btn btn-success"
                        >
                            No
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}
