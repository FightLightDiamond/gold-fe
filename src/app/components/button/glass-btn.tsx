import React from "react";
import styles from '../../../styles/glass-btn.module.css'

const GlassBtn: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.btn}>
          <a href="#">Read more</a>
          <a href="#">Read more</a>
          <a href="#">Read more</a>
        </div>

        <div className={styles.btn}>
          <a href="#">Read more</a>
          <a href="#">Read more</a>
          <a href="#">Read more</a>
        </div>

        <div className={styles.btn}>
          <a href="#">Read more</a>
          <a href="#">Read more</a>
          <a href="#">Read more</a>
        </div>
      </div>
    </div>
  )
}

export default GlassBtn
