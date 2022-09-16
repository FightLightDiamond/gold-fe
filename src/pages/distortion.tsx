import styles from "../styles/distortion.module.css";
const Distortion = () => {
  return (<div className={styles.all}>
    <div className={styles.body}>
      <video muted={true} autoPlay={true} loop={true} src="/videos/particles.mp4"/>
      <h2><span>Rich</span> for <span>fun</span>. I'm <span>rich</span>!!!</h2>
    </div>
  </div>);
}

export default Distortion
