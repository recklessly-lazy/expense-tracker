import React, { useContext, useRef, useState } from "react";

import Styles from "./UserProfile.module.scss";
import { Form, InputGroup } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import { AuthContext } from "../../Auth/AuthContext";
import { updateProfile } from "firebase/auth";

function UserProfile() {
    const ctx = useContext(AuthContext);
    const [imgSrc, setImgSrc] = useState(ctx?.user?.photoURL);

    const [isEditMode, setIsEditMode] = useState(false);
    const handleUpload = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const file: File = event.target[0]?.files[0];
        console.log("file ===", file);

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: "image/jpeg",
        };

        const storageRef = ref(storage, `${ctx?.user?.uid}/dp/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload paused");
                        break;
                    case "running":
                        console.log("upload running");
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        break;

                    // ...

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImgSrc(downloadURL);
                    updateProfile(ctx?.user!, {
                        photoURL: downloadURL,
                    });
                });
            }
        );
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

    return (
        <div className={Styles.profilePage}>
            <div className={Styles.profileFormContainer}>
                <div
                    className={Styles.imageContainer}
                    style={{
                        backgroundColor:'white',
                        backgroundImage: `url(${imgSrc})`,
                    }}
                ></div>
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
