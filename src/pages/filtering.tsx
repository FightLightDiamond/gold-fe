
import styles from "../styles/filtering.module.css";
import { memo } from "react";

const Filtering = () => {
  return (
    <div className={styles.root}>
      <div className={styles.body}></div>
    </div>
  );
};

export default memo(Filtering);
