
import styles from '../styles/nav.module.css'
import IonIcon from '@reacticons/ionicons';

const Nav = () => {
  return <div className={styles.all}>
    <div className={styles.body}>
      <ul className={styles.navigation}>
        <li className={styles.active}>
          <a href="#">
            <span className={styles.icon}>
              <IonIcon name="home-sharp" />
            </span>
            <span className={styles.text}>Home</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>
              <IonIcon name="person-outline" />
            </span>
            <span className={styles.text}>Profile</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>
              <IonIcon name="chatbubble-outline" />
            </span>
            <span className={styles.text}>Messages</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>
              <IonIcon name="camera-outline" />
            </span>
            <span className={styles.text}>Photo</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className={styles.icon}>
              <IonIcon name="settings-outline" />
            </span>
            <span className={styles.text}>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
}

export default Nav
