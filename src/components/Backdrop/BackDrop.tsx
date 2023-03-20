import React, { useRef } from "react";
import styles from "./BackDrop.module.scss";
import { CSSTransition } from "react-transition-group";

function BackDrop({
    opacity = 0.6,
    onBackdropClick,
    show,
}: {
    opacity?: number;
    onBackdropClick?: Function;
    show: boolean;
}) {
    const nodeRef = useRef(null);
    return (
        <>
            <CSSTransition
                timeout={500}
                in={show}
                unmountOnExit
                mountOnEnter
                classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
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
                    style={{
                            backgroundColor:`rgba(0, 0, 0, ${opacity})`

                    }}
                ></div>
            </CSSTransition>
        </>
    );
}

export default BackDrop;
