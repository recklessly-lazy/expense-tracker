import React, { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./Authentication.module.scss";
import { AuthContext, AuthCtx } from "../../Auth/AuthContext";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { Errors } from "./Errors";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebase-config";
import { BaseLayout } from "../../Layout/BaseLayout";

function Authentication() {
    useEffect(() => {
        console.log("inside Authentication");
    }, []);
    const context = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [formErr, setFormErr] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function toggleSignIn() {
        setIsLogin((prev) => !prev);
    }

    function handleLoginForm(event: any) {
        setFormErr("");

        setIsLoading(true);
        event.preventDefault();
        let res = isLogin
            ? signInWithEmailAndPassword(getAuth(app), username, password)
            : createUserWithEmailAndPassword(getAuth(app), username, password);

        res.then((response) => {
            context?.login(response.user);
        })
            .catch((err) => {
                console.log("err ===", err);
                setFormErr(
                    Errors[err.code as keyof typeof Errors] ||
                        err.code.replace("auth/", "").split("-").join(" ")
                );
            })
            .finally(() => {
                setIsLoading(false);
                navigate("/");
            });
    }

    return (
        <BaseLayout>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <form
                    className={styles.login}
                    onSubmit={(e: FormEvent) => {
                        handleLoginForm(e);
                    }}
                >
                    <h3 className="ps-3 mb-4" style={{ textAlign: "center" }}>
                        <strong>{isLogin ? "Login" : "Sign up"}</strong>
                    </h3>
                    <div className="pb-2">
                        <label htmlFor="username" className="form-label ps-2">
                            Username
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <label htmlFor="password" className="form-label ps-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="pt-3">
                        <button type="submit" className={styles.submitBtn}>
                            {isLogin ? "Login" : "Create account"}
                        </button>
                    </div>

                    {formErr && formErr.length > 0 ? (
                        <div
                            className={
                                "text-danger text-center pt-3 pb-2 " +
                                styles.errText
                            }
                        >
                            {formErr}
                        </div>
                    ) : (
                        isLoading && (
                            <div
                                className={
                                    "text-center pt-3 pb-2 " + styles.errText
                                }
                            >
                                Loading{" "}
                                <Spinner
                                    animation="border"
                                    variant="info"
                                    size="sm"
                                />
                            </div>
                        )
                    )}
                    <div className="d-flex flex-column align-items-center pt-3">
                        <span>
                            {isLogin ? "New" : "Existing"} User ? &nbsp;
                            <button
                                type="button"
                                onClick={toggleSignIn}
                                className={styles.signUpBtn}
                            >
                                <strong>{isLogin ? "Sign Up" : "Login"}</strong>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </BaseLayout>
    );
}

export default Authentication;
