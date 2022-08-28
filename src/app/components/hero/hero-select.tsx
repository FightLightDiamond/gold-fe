import styles from "../../../styles/Home.module.css";
import {Tilt} from "../Tilt";
import { motion } from "framer-motion";
import {IMatchLog} from "../../interfaces/match-log.interface";
import {ProgressBar} from "react-bootstrap";
const HeroSelect = ({ hero , away }: { hero: IMatchLog, away: IMatchLog }) => {
  return <Tilt
    className={styles.card}
    options={{
      scale: 1,
      speed: 1000,
      max: 10,
    }}
  >
    <motion.div
      animate={{
        opacity: hero.current_hp ? 1 : 0,
      }}
      transition={{
        duration: 1,
        // repeat: 2,
      }}
      className={styles.content}>
      <ProgressBar label={hero.current_hp} variant="danger" now={(hero.current_hp)} max={hero.hp} />
      <ProgressBar label={hero.current_atk} variant="warning" now={(hero.current_atk)} max={hero.atk * 3} />
      <ProgressBar label={hero.current_def} variant="info" now={(hero.current_def)} max={hero.def * 3} />
      <ProgressBar label={hero.current_crit_rate} variant="success" now={(hero.current_crit_rate)} max={100} />
      <ProgressBar label={hero.current_crit_dmg} now={(hero.current_crit_dmg)} max={400} />
      <motion.h1
        animate={{
          opacity: hero.take_dmg ? [1, 0] : 0,
        }}
        transition={{
          delay: 1,
          type: "tween",
          duration: 2,
          // repeat: 2,
        }}
        className="text-info">{hero.take_dmg ? hero.take_dmg : ''}&nbsp;</motion.h1>
      <motion.div className={styles.img}
                  animate={{
                    x: !hero.take_dmg ? 300 : 0,
                    // backgroundColor: "blue",
                    scale: !hero.take_dmg ? [0.7, 1] : 1,
                    opacity: !hero.take_dmg ? [0.5, 1] : 1,
                  }}
                  transition={{
                    type: "tween",
                    duration: 2,
                    // repeat: 1,
                    // type: "spring",
                    // bounce: 100,
                    // type: "inertia",
                    // velocity: 1,
                  }}
      >
        <img
          src={`/img/heroes/${hero?.name}.png`}
          alt="of the author"
          className="img-fluid"
        />
      </motion.div>
      <h2>01</h2>
      <p></p>
      <a
        href="#"
        // onClick={() =>
        //     dispatch(
        //         bet({
        //             match_id: 1,
        //             hero_id: 1,
        //             balance: 999,
        //         })
        //     )
        // }
      >
        BET
      </a>
    </motion.div>
    <motion.div
      animate={{
        opacity: away.current_hp ? 1 : 0,
      }}
      transition={{
        duration: 1,
        // repeat: 2,
      }}
      className={styles.content}>
      <ProgressBar label={away.current_hp} variant="danger" now={(away.current_hp)} max={away.hp} />
      <ProgressBar label={away.current_atk} variant="warning" now={(away.current_atk)} max={away.atk * 3} />
      <ProgressBar label={away.current_def} variant="info" now={(away.current_def)} max={away.def * 3} />
      <ProgressBar label={away.current_crit_rate} variant="success" now={(away.current_crit_rate)} max={100} />
      <ProgressBar label={away.current_crit_dmg} now={(away.current_crit_dmg)} max={400} />
      <motion.h1
        animate={{
          opacity: away.take_dmg ? [1, 0] : 0,
        }}
        transition={{
          delay: 1,
          type: "tween",
          duration: 2,
          // repeat: 2,
        }}
        className="text-info">{away.take_dmg ? away.take_dmg : ''}&nbsp;</motion.h1>
      <motion.div className={styles.img}
                  animate={{
                    x: !away.take_dmg ? -100 : 0,
                    // backgroundColor: "blue",
                    scale: !away.take_dmg ? [0.7, 1] : 1,
                    opacity: !away.take_dmg ? [0.5, 1] : 1,
                  }}
                  transition={{
                    type: "tween",
                    duration: 2,
                    // repeat: 1,
                    // type: "spring",
                    // bounce: 100,
                    // type: "inertia",
                    // velocity: 1,
                  }}
      >
        <img
          src={`/img/heroes/${away?.name}.png`}
          alt="of the author"
          className="img-fluid"
        />
      </motion.div>
      <h2>01</h2>
      <p></p>
      <a
        href="#"
        // onClick={() =>
        //     dispatch(
        //         bet({
        //             match_id: 1,
        //             hero_id: 1,
        //             balance: 999,
        //         })
        //     )
        // }
      >
        BET
      </a>
    </motion.div>
  </Tilt>
}

export default HeroSelect
