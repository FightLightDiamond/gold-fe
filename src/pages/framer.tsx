
import styles from '../styles/framer.module.css'
import Box1 from "../app/components/framer/box1";
import Box2 from "../app/components/framer/box2";
import Box3 from "../app/components/framer/box3";
import Box4 from "../app/components/framer/box4";
import Box5 from "../app/components/framer/box5";

const Framer = () => {
  return (<div className={styles.all}>
    <div className={styles.app}>
        <Box1/>
        <Box2/>
        <Box3/>
        <Box4/>
        <Box5/>
    </div>
  </div>);
}

export default Framer
