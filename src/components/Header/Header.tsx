import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import SideNav from "../SideNav/SideNav";

function Header({
    height,
    toggleSideNav,
}: {
    height: string | number;
    toggleSideNav: Function;
}) {
    const context = useContext(AuthContext);
    const displayName = context?.user?.displayName;
    const email = context?.user?.email;

    const [profileMenuToggled, setProfileMenuToggled] = useState(false);
    useEffect(() => {}, [context?.user]);

    const menu = (
        <div
            style={{
                position: "absolute",
                padding: "20px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "1px 1px 8px #555",
                right: "0px",
            }}
        >
            <Link
                className={styles.links}
                to={"/profile"}
                style={{
                    color: "black",
                    display: "block",
                }}
            >
                Profile
            </Link>
            <hr
                style={{
                    margin: "10px 0",
                    opacity: "0.1",
                    border: "1px solid black",
                }}
            />
            <Link
                className={styles.links}
                to={"/login"}
                onClick={() => {
                    context?.logout();
                }}
                style={{
                    color: "black",
                    display: "block",
                }}
            >
                Logout
            </Link>
        </div>
    );
    const nav = (
        <>
            {!context?.user ? null : (
                <div
                    style={{
                        position: "relative",
                        display: "none",
                    }}
                >
                    <button
                        className={
                            "btn d-flex justify-content-evenly align-items-center " +
                            styles.iconBtn
                        }
                        onClick={() => {
                            setProfileMenuToggled((prev) => !prev);
                        }}
                    >
                        <i className={"bi bi-person-circle " + styles.icon}></i>
                        <strong className="ms-2">
                            {displayName ? displayName : email}
                        </strong>
                    </button>

                    {profileMenuToggled && menu}
                </div>
            )}
        </>
    );

    return (
        <div
            className={styles.header}
            style={{
                height: height + "px",
            }}
        >
            <nav className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn"
                        onClick={() => {
                            toggleSideNav((prev: boolean) => !prev);
                        }}
                    >
                        {" "}
                        <i
                            className="bi bi-list pe-2"
                            style={{ fontSize: "24px", color: "white" }}
                        ></i>
                    </button>
                    <h5 style={{ margin: "0" }}>
                        <Link to={"/"} className={styles.links}>
                            <strong>Expense Tracker</strong>
                        </Link>
                    </h5>
                </div>
                {nav}
            </nav>
        </div>
    );
}

export default Header;
