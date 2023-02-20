import { ReactNode, useContext, useState } from "react";
import Header from "../components/Header/Header";
import styles from "./BaseLayout.module.scss";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import { AuthContext } from "../Auth/AuthContext";

const headerHeight = 80;

export function BaseLayout({ children }: { children: ReactNode }) {
    const [isNavtoggled, setIsNavtoggled] = useState(false);
    const isLoggedIn = useContext(AuthContext)?.isLoggedIn;
    return (
        <>
            <Header height={headerHeight} toggleSideNav={setIsNavtoggled} />
            <main
                className={styles.main}
                style={{
                    height: `calc(100% - ${headerHeight}px)`,
                    top: `${headerHeight}px`,
                }}
            >
                {isLoggedIn && (
                    <SideNav
                        toggled={isNavtoggled}
                        onToggle={setIsNavtoggled}
                    />
                )}
                {children}
            </main>
        </>
    );
}
