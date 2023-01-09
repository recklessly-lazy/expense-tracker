import React from "react";
import styles from "./BackDrop.module.scss";

function BackDrop({onClick}: {onClick: CallableFunction}) {
    return <div className={styles.backDrop}>BackDrop</div>;
}

export default BackDrop;
