import { useRef } from "react";
import BackDrop from "../Backdrop/BackDrop";
import styles from "./ConfirmationModal.module.scss";

export default function ConfirmationModal({
    confirm,
    ref,
}: {
    confirm: Function;
    ref: React.MutableRefObject<null>;
}) {
    return (
        <>
            <BackDrop show />

            <div ref={ref} className={styles.modal}>
                <h6>Are you sure, you want to delete this ?</h6>
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
        </>
    );
}
