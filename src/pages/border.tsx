import styles from "../styles/border.module.css";

const Border = () => {
    return (
        <div className={styles.all}>
            <div className={styles.body}>
                <div className={styles.box}>
                    <span></span>
                    <h2>MR.K<small>Rich</small></h2>
                </div>
            </div>
        </div>
    );
};

export default Border;
