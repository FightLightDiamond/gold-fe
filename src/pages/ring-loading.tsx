
import styles from "../styles/ring-loading.module.css";

const RingLoading = () => {
  return (
    <div className={styles.all}>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          {/*<p>Skill Fighting</p>*/}
        </div>
      </div>
    </div>
  )
}

export default RingLoading
