import React from "react";
import style from "./Header.module.scss";

function Header({ height }: { height: string | number }) {
    return (
        <div
            className={style.header}
            style={{
                height: height + "px",
            }}
        >
            <h3>
                <strong>Expense Tracker</strong>
            </h3>
            <ul className={style.ul}>
                <li>Link 1</li>
                <li>Link 2</li>
            </ul>
        </div>
    );
}

export default Header;
