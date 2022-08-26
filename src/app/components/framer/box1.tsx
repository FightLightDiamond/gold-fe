import React, {useState} from "react";
import styles from '../../../styles/framer.module.css'
import {AnimationControls, motion, Target, TargetAndTransition, Transition, VariantLabels} from "framer-motion";

const Box1: React.FC = () => {
    const [animate, setAnimate] = useState<AnimationControls | TargetAndTransition | VariantLabels | any>({
        x: 0,
        opacity: 0.5,
        rotate: 0
    })
    const [initial, setInitial] = useState<boolean | Target | VariantLabels>({
        opacity: 0.5
    })
    const [transition, setTransition] = useState<Transition>({
        // type: 'tween', // Hoàn thành tỏng bao lâu
        // duration: 2,
        type: 'spring', // Đi được bao lâu 1 s
        stiffness: 60,
        damping: 6 // Độ lắc giảm
    })

    const handleClick = () => {
        if (0 !== animate?.rotate) {
            setAnimate({
                x: 0,
                opacity: 0.5,
                rotate: 0
            })
        } else {
            setAnimate({
                x: "50rem",
                opacity: 1,
                backgroundColor: "blue",
                scale: 0.5,
                rotate: 360
            })
        }
    }

    return <div className={styles.box_container} onClick={handleClick}>
        <motion.div className={styles.box}
            animate={animate}
            initial={initial}
            transition={transition}
        >

        </motion.div>
    </div>
}

export default Box1
