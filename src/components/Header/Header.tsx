import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";

function Header({ height }: { height: string | number }) {
    const context = useContext(AuthContext);
    return (
        <div
            className={styles.header}
            style={{
                height: height + "px",
            }}
        >
            <h5>
                <Link to={"/"} className={styles.links}>
                    <strong>Expense Tracker</strong>
                </Link>
            </h5>
            <nav>
                {!context.isLoggedIn ? (
                    <Link className={styles.links} to={"/login"}>
                        Login
                    </Link>
                ) : null}
            </nav>
        </div>
    );
}

export default Header;
