import React, {useState} from "react";
import {AnimationControls, motion, Target, TargetAndTransition, Transition, VariantLabels} from "framer-motion";
import styles from '../../../styles/framer.module.css'

const Box3: React.FC = () => {
  const boxVariant = {
    lion: {
      x: 100,
      scale: 1.5
    },
    elephant: {
      x: 200,
      scale: 1,
      rotate: 45,
      backgroundColor: 'green'
    },
    fish: {
      x: 300,
      scale: 0.75,
      rotate: 65,
      backgroundColor: 'silver'
    },
  }

  const boxV = {
    hidden: {
      x: "-100vw"
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.5,
        when: "beforeChildren"
      }
    }
  }

  const listV = {
    hidden: {
      x: "-10",
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 2
      },
      staggerChildren: 0.2
    }
  }

  const [code, setCode] = useState<string>('')

  return <div className={styles.box_container}>
    <motion.div className={styles.box}
      // animate={code}
      animate="visible"
      initial="hidden"
      // variants={boxVariant}
      variants={boxV}

    >
      <button className={'btn btn-sm btn-primary'} onClick={() => setCode('lion')}>Lion</button>
      <button className={'btn btn-sm btn-primary'} onClick={() => setCode('elephant')}>elephant</button>
      <button className={'btn btn-sm btn-primary'} onClick={() => setCode('fish')}>fish</button>
      {
        [1, 2, 3].map((box) => {
          return <motion.li key={box} className={styles.boxItem}
                            // animate="visible"
                            // initial="hidden"
                            variants={listV}
          ></motion.li>
        })
      }
    </motion.div>
  </div>
}

export default Box3
