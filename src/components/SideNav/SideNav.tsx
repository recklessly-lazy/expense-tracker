import React, { useContext, useRef, useState } from "react";
import BackDrop from "../Backdrop/BackDrop";
import { CSSTransition } from "react-transition-group";
import styles from "./SideNav.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";

function SideNav({
    toggled,
    onToggle,
}: {
    toggled: boolean;
    onToggle: Function;
}) {
    const ctx = useContext(AuthContext);
    const nodeRef = useRef(null)
    return (
        <>
            <BackDrop
                show={toggled}
                onBackdropClick={() => {
                    onToggle((prev: boolean) => !prev);
                }}
            />
            <CSSTransition
                in={toggled}
                timeout={500}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
                }}
                addEndListener={() => { }}
                nodeRef={nodeRef}
            >
                <div ref={nodeRef}className={styles.sideNav}>
                    <ul>
                        <li>
                            <Link to={"/profile"} >Profile</Link>
                        </li>
                        <li>
                            <Link
                                to={"/login"}
                                onClick={() => {
                                    ctx?.logout();
                                }}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </>
    );
}

export default SideNav;
