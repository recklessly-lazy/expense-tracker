import { getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../../../firebase/firebase-config";
import {AuthContext} from "../../../Auth/AuthContext";
import { CSSTransition } from "react-transition-group";
import { updateProfile } from "firebase/auth";
import BackDrop from "../../../components/Backdrop/BackDrop";

import Styles from './UploadComponent.module.scss'


interface UploadProps {
    // handleUpload: FormEventHandler;
    refreshDp: Function;
    cancelUpload: Function;
    show: boolean;
}
const UploadPhotoComp = ({ show, cancelUpload, refreshDp }: UploadProps) => {
    const [imgUrls, setImgUrls] = useState<Array<string>>();
    const ctx = useContext(AuthContext)
    useEffect(() => {
        const storageRef = ref(storage, `${ctx?.user?.uid}/dp`);
        listAll(storageRef).then(async (res) => {
            let imgUrls = [];
            for (let img of res.items) {
                // console.log("image ===", img);
                // console.log("img url ===", await getDownloadURL(img));
                await imgUrls.push(await getDownloadURL(img));
            }
            console.log("imgurls ===", imgUrls);
            await setImgUrls(imgUrls);
        });
    }, []);

    const fileRef = useRef<HTMLInputElement>(null);

    const nodeRef = useRef(null);

    const [selectedImg, setSelectedImg] = useState("");

    const [previewUrl, setPreviewUrl] = useState("");

    const firebaseFileUpload = (file: File) => {
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
                    // setImgSrc(downloadURL);
                    updateProfile(ctx?.user!, {
                        photoURL: downloadURL,
                    });
                });
            }
        );
    };

    const handleUpload = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        console.log("target ===", event.target);

        const file: File = event.target[1]?.files[0];
        console.log("file in handle upload ===", file);

        if (file) {
            firebaseFileUpload(file);
            cancelUpload();
        } else if (selectedImg) {
            console.log("selected ===", selectedImg);
            updateProfile(ctx?.user!, {
                photoURL: selectedImg,
            });
            // setImgSrc(selectedImg);
            cancelUpload();
        }
    };
    const fileInputHandler = () => {
        var file = fileRef.current?.files?.[0];
        console.log("file ===", file);
        let fileUrl = URL.createObjectURL(file!);
        console.log("File url ===", fileUrl);
        setPreviewUrl(fileUrl);
    };
    return (
        <>
            <BackDrop show={show} onBackdropClick={cancelUpload} />
            <CSSTransition
                nodeRef={nodeRef}
                in={show}
                mountOnEnter
                unmountOnExit
                timeout={500}
                classNames={{
                    enter: Styles.enter,
                    enterActive: Styles.enterActive,
                    exit: Styles.exit,
                    exitActive: Styles.exitActive,
                }}
                addEndListener={() => {}}
            >
                <form
                    ref={nodeRef}
                    onSubmit={handleUpload}
                    className={Styles.uploadComp}
                >
                    <div className="container p-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                fileRef.current?.click();
                            }}
                        >
                            Upload new pic
                        </button>
                        <input
                            onChange={fileInputHandler}
                            ref={fileRef}
                            style={{
                                display: "none",
                            }}
                            type="file"
                        />
                    </div>
                    {previewUrl && (
                        <div className="container">
                            <span>Chosen file:</span>
                            <img width={100} src={previewUrl} />
                        </div>
                    )}
                    <div className={Styles.imgList}>
                        {imgUrls &&
                            imgUrls.map((img) => (
                                <button
                                    type="button"
                                    key={img}
                                    style={{
                                        backgroundImage: `url(${img})`,
                                    }}
                                    className={
                                        Styles.listImg +
                                        " " +
                                        `${
                                            img === selectedImg &&
                                            previewUrl === ""
                                                ? Styles.selectedImg
                                                : ""
                                        }`
                                    }
                                    onClick={() => {
                                        setSelectedImg(img);
                                    }}
                                ></button>
                            ))}
                    </div>
                    <div className={Styles.uploadFormActions}>
                        <button onClick={() => {
                            cancelUpload()
                        }} type="button" className="btn btn-warning">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </div>
                </form>
            </CSSTransition>
        </>
    );
};

export default UploadPhotoComp