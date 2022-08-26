
import styles from "../styles/motion.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

const Motion = () => {
  const [rotate, setRotate] = useState(false);
  const [move, setMove] = useState(false);
  return (
    <div className={styles.all}>
      <div className={styles.app}>
        <button onClick={() => setMove(!move)}>Move</button>
        <motion.div
          className={styles.box}
          animate={{
            x: move ? 300 : 0,
            backgroundColor: "blue",
            scale: 1,
            rotate: rotate ? 360 : 0,
          }}
          transition={{
            type: "tween",
            duration: 1,
            repeat: 2,
            // type: "spring",
            // bounce: 100,
            // type: "inertia",
            // velocity: 1,
          }}
          // initial={{scale: 0}}
          onClick={() => setRotate(!rotate)}
        />

        <motion.div
          className={styles.box}
          animate={{
            x: [0, 400, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration:[0.5],
            repeat: Infinity,
          }}
          // initial={{scale: 0}}
        />

        <motion.div
          className={styles.box2}
          animate={{
            // backgroundPosition: [0, 100, 200, 300, 400],
            // rotate: 180,
            // x: [0, 1000],
            // backgroundColor: [
            //   "#000",
            //   "#111ccc",
            //   "#222abc",
            //   "#333abc",
            //   "#fff000",
            // ],
            backgroundImage: [
              `url("http://localhost:3000/img/png/Dead (1).png")`,
              `url("http://localhost:3000/img/png/Dead (2).png")`,
              // `url("http://localhost:3000/img/png/Dead (3).png")`,
              // `url("http://localhost:3000/img/png/Dead (4).png")`,
              // `url("http://localhost:3000/img/png/Dead (5).png")`,
            ],
            // backgroundPosition: [0, -832],
            // transition: {
            //   backgroundImage: `url("http://localhost:3000/img/png/Dead (1).png")`,
            //   backgroundPositionX: 222,
            //   // keyframes: {
            //   //   from: {
            //   //     backgroundPositionX: 0,
            //   //   },
            //   //   to: {
            //   //     backgroundPositionX: 832,
            //   //   },
            //   // },
            //   steps: 6,
            //   duration: 0.6,
            //   repeat: Infinity,
            // },
          }}
          transition={{
            // backgroundColor: "#123abc",
            // backgroundPositionX: 0,
            // backgroundPositionY: 0,
            // keyframes: {
            //   from: {
            //     backgroundPositionX: 0,
            //   },
            //   to: {
            //     backgroundPositionX: 832,
            //   },
            // },
            // steps: 6,
            // type: "keyframes",
            // times: [1, 2, 3, 4, 5],
            // ease: [1, 2, 3, 4, 5],
            // timeConstant: 1,
            // repeatDelay: Infinity,
            duration: 5,
            repeat: Infinity,
          }}
          // transitionEnd: { display: "none" }
          initial={
            {
              // backgroundImage: `url("http://localhost:3000/img/png/Dead (1).png")`,
              // height: "137",
              // boxShadow: "10px 10px 0 Rgba(0, 0, 0, 0.2)",
              // animation: "animate 1s steps(6) infinite",
              // backgroundPositionX: 220,
              // backgroundPositionY: 220,
            }
          }
        />
      </div>
    </div>
  );
};

export default Motion;
