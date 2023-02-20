import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { app } from "../firebase/firebase-config";

export type AuthCtx = {
    user: User | undefined | null;
    isLoggedIn: boolean;
    login: (user: User | null) => void;
    logout: () => void;
    isAuthPending: boolean;
};

export const AuthContext = createContext<AuthCtx | null>(null);

function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null | undefined>();
    const isUserLoggedIn = !!user;
    const [authPending, setAuthPending] = useState(true);

    useEffect(() => {
        onAuthStateChanged(getAuth(), (currentUser) => {
            console.log(
                "inside onAuthStateChanged, currentUser ===",
                currentUser
            );
            if (currentUser) {
                context?.login(currentUser);
            }
            setAuthPending(false);
        });
    }, []);

    const autoLogout = (time: any) => {
        context.logout();
    };

    function login(user: User | null) {
        console.log("logging in, \nuser ===", user);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }
    function logout() {
        setUser(null);
        signOut(getAuth(app))
            .then((x) => {
                // Sign-out successful.
                console.log("signed out !",x);
                
            })
            .catch((error) => {
                // An error happened.
            });;
        localStorage.clear();
    }
    const context = {
        user: user,
        isLoggedIn: isUserLoggedIn,
        login: login,
        logout: logout,
        isAuthPending: authPending,
    };

    if (authPending) {
        return (
            <div
                className="d-flex w-100 h-100 justify-content-center align-items-center"
                id="loading"
            >
                <span className="pe-2">Loading</span>
                <Spinner size="sm" variant="info" animation="border" />
            </div>
        );
    }
    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
}
export default AuthContextProvider;
