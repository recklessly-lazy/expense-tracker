import React, { useRef } from "react";
import styles from "./BackDrop.module.scss";
import { CSSTransition } from "react-transition-group";

function BackDrop({
    onClick,
    show,
}: {
    onClick?: CallableFunction;
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
                <div className={styles.backDrop} ref={nodeRef}></div>
            </CSSTransition>
        </>
    );
}

export default BackDrop;
