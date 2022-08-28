import styles from "../styles/down-clock.module.css";
import React from "react";

const DownClock: React.FC = () => {
  return (
    <div className={styles.all}>
      <div className={styles.body}>
        <div id={styles.time}>
          <div className={styles.circle}>
            <div id={styles.hours}>00</div>
          </div>
          <div className={styles.circle}>
            <div id={styles.minutes}>00</div>
          </div>
          <div className={styles.circle}>
            <div id={styles.second}>00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownClock;
