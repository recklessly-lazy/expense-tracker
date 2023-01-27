import { ReactNode, createContext, useState } from "react";

export const AuthContext = createContext({
    login: (token: string) => {},
    logout: () => {},
    token: "",
    isLoggedIn: false,
});

function AuthContextProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState("");
    const isUserLoggedIn = token.length > 0;

    function login(token: string) {
        setToken(token);
    }
    function logout() {
        setToken("");
    }
    const context = {
        token: token,
        isLoggedIn: isUserLoggedIn,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
}
export default AuthContextProvider;