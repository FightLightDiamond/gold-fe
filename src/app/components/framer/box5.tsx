import React from "react";
import {
  AnimationControls,
  motion,
  Target,
  TargetAndTransition,
  Transition,
  useAnimation,
  VariantLabels
} from "framer-motion";
import styles from '../../../styles/framer.module.css'

const Box5: React.FC = () => {
  const control = useAnimation()

  return <div className={styles.box_container}>
    <button onClick={() => control.start({
      x: 250,
      transition: {duration: 2}
    })} className={'btn btn-primary btn-sm'}>Move Right</button>
    <button onClick={() => control.start({
      x: 0,
      transition: {duration: 2}
    })} className={'btn btn-primary btn-sm'}>Move Left</button>
    <button onClick={() => control.start({
      borderRadius: '50%',
      transition: {duration: 2}
    })} className={'btn btn-primary btn-sm'}>Circle</button>
    <button onClick={() => control.start({
      borderRadius: '0%',
      transition: {duration: 2}
    })} className={'btn btn-primary btn-sm'}>Square</button>
    <button onClick={() => control.stop()} className={'btn btn-primary btn-sm'}>Stop</button>
    <motion.div className={styles.box}
                animate={control}
    >
    </motion.div>
  </div>
}

export default Box5
