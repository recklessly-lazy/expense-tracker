import React, { ReactNode } from "react";
import Header from "../components/Header/Header";
import styles from "./Layout.module.scss";

const headerHeight = 80;

function Layout({ children }: { children: ReactNode }) {
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
                {children}
            </main>
        </>
    );
}

export default Layout;
