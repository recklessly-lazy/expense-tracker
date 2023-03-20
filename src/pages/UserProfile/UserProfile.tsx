import React, {
    FormEventHandler,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import Styles from "./UserProfile.module.scss";
import { Form, InputGroup } from "react-bootstrap";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import { AuthContext } from "../../Auth/AuthContext";
import { updateProfile } from "firebase/auth";
import BackDrop from "../../components/Backdrop/BackDrop";
import { CSSTransition } from "react-transition-group";
import UploadPhotoComp from "./UploadComponent/UploadComponent";

function UserProfile() {
    const ctx = useContext(AuthContext);
    const [imgSrc, setImgSrc] = useState(ctx?.user?.photoURL);

    const [isEditMode, setIsEditMode] = useState(false);

    const [isDpEdit, setIsDpEdit] = useState(false);

    
    const cancelUpload = () => {
        setIsDpEdit(false);
    };

    const nameRef = useRef<HTMLInputElement>(null);
    const handleEdit = () => {
        if (!isEditMode) {
            setIsEditMode(true);
        } else {
            console.log("name ref ===", nameRef.current?.value);
            setIsEditMode(false);
            updateProfile(ctx?.user!, {
                displayName: nameRef.current?.value,
            })
                .then((res) => {
                    console.log("response ===", res);
                })
                .catch((err) => {
                    console.log("err ===", err);
                });
        }
    };

    const refreshDp = (url: string) => {
        setImgSrc(url);
    };

    return (
        <div className={Styles.profilePage}>
            <UploadPhotoComp
                show={isDpEdit}
                refreshDp={refreshDp}
                cancelUpload={cancelUpload}
            />
            <div className={Styles.profileFormContainer}>
                <div
                    className={Styles.imageContainer}
                    style={{
                        backgroundColor: "white",
                        backgroundImage: `url(${imgSrc})`,
                    }}
                >
                    <button
                        className={
                            "btn d-flex align-items-center justify-content-center " +
                            Styles.editDp
                        }
                        onClick={() => {
                            setIsDpEdit(true);
                        }}
                    >
                        <i
                            style={{
                                color: "white",
                                fontSize: "1.5rem",
                                transform: "rotateY(180deg)",
                            }}
                            className="bi bi-camera-fill"
                        ></i>
                    </button>
                </div>
                <form>
                    <div className="offset-9 col-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleEdit}
                        >
                            {!isEditMode ? "Edit" : "Save"}
                        </button>
                    </div>
                    <div className="pe-2 ps-2 pt-1">
                        <label className="ps-2 form-label" htmlFor="email">
                            Email id
                        </label>
                        <input
                            title={ctx?.user?.email!}
                            className="form-control"
                            disabled
                            value={ctx?.user?.email || ""}
                        />
                    </div>
                    <div className="pe-2 ps-2 pt-1">
                        <label className="ps-2 form-label" htmlFor="email">
                            Display Name
                        </label>
                        <input
                            ref={nameRef}
                            title={ctx?.user?.email!}
                            className="form-control"
                            disabled={!isEditMode}
                            defaultValue={ctx?.user?.displayName || ""}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
