import React, { ReactNode, useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import styles from "./Layout.module.scss";
import { Outlet, redirect, useNavigate } from "react-router-dom";


const headerHeight = 80;

function Layout() {


    return (
        <>
            <Header height={headerHeight} />
            <main
                className={styles.main}
                style={{
                    height: `calc(100% - ${headerHeight}px)`,
                    top: `${headerHeight}px`,
                }}
            >
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
