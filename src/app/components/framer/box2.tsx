import React from "react";
import {AnimationControls, motion, Target, TargetAndTransition, Transition, VariantLabels} from "framer-motion";
import styles from '../../../styles/framer.module.css'

const Box2: React.FC = () => {
  return <div className={styles.box_container}>
    <motion.div className={styles.box}
      whileHover={{
        scale: 1.2
      }}
      whileTap={{
        scale: 0.9
      }}
      drag
      dragConstraints={{
        top: 20,
        bottom: 20,
        right: 20,
        left: 20
      }}
    >

    </motion.div>
  </div>
}

export default Box2
