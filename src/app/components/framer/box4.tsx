import React from "react";
import {AnimationControls, motion, Target, TargetAndTransition, Transition, VariantLabels} from "framer-motion";
import styles from '../../../styles/framer.module.css'

const Box4: React.FC = () => {
  return <div className={styles.box_container}>
    <motion.div className={styles.box}
      animate={{
        // scale: [1, 1.4, 0.4, 1, 3, 1]
        scale: [1, 1.4, 1.4, 1, 1],
        borderRadius: ['20%', '20%', '50%', '5%', '30%'],
        rotate: [0, 0, 270, 170, 200]
      }}
      transition={{
        duration: 2
      }}
    >

    </motion.div>
  </div>
}

export default Box4
