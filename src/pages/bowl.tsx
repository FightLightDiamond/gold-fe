
import styles from "../styles/bowl.module.css";

const Bowl = () => {
  return (
    <div className={styles.body}>
      <div className={styles.section}>
        <div className={styles.bowl}>
          <div className={styles.liquid}></div>
        </div>
      </div>
    </div>
  )
}

export default Bowl
