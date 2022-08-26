
import styles from "../styles/finger-scanner.module.css";

const FingerScanner = () => {
  return (
    <div className={styles.all}>
      <div className={styles.scan}>
      <div className={styles.scan}>
          <div className={styles.fingerprint}></div>
        <h3>Scanning...</h3>
      </div>
    </div>
    </div>
  )
}

export default FingerScanner
