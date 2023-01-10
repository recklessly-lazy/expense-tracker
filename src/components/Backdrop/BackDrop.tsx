import React, { useRef } from "react";
import styles from "./BackDrop.module.scss";
import { CSSTransition } from "react-transition-group";

function BackDrop({
    onBackdropClick,
    show,
}: {
    onBackdropClick?: Function;
    show: boolean;
}) {
    const nodeRef = useRef(null);
    return (
        <>
            <CSSTransition
                in={show}
                unmountOnExit
                mountOnEnter
                classNames={{
                    enter: styles.backDrop,
                    exit: styles.exit,
                }}
                addEndListener={() => {}}
                nodeRef={nodeRef}
            >
                <div
                    onClick={() => {
                        if (onBackdropClick) onBackdropClick();
                    }}
                    className={styles.backDrop}
                    ref={nodeRef}
                ></div>
            </CSSTransition>
        </>
    );
}

export default BackDrop;
