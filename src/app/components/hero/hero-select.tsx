import styles from "../../../styles/Home.module.css";
import {Tilt} from "../Tilt";
import {motion} from "framer-motion";
import {IMatchLog} from "../../interfaces/match-log.interface";
import {ProgressBar} from "react-bootstrap";
import {placeBet} from '../../http/store/reducers/bet.slice'
import {useDispatch} from "react-redux";

const HeroTurn = ({hero}: { hero: IMatchLog }) => {
  const dispatch = useDispatch()

  return <Tilt
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
      <ProgressBar label={hero.current_hp} variant="danger" now={(hero.current_hp)} max={hero.hp}/>
      <ProgressBar label={hero.current_atk} variant="warning" now={(hero.current_atk)} max={hero.atk * 3}/>
      <ProgressBar label={hero.current_def} variant="info" now={(hero.current_def)} max={hero.def * 3}/>
      <ProgressBar label={hero.current_crit_rate} variant="success" now={(hero.current_crit_rate)} max={100}/>
      <ProgressBar label={hero.current_crit_dmg} now={(hero.current_crit_dmg)} max={400}/>
      <div>
        <motion.h1
          initial={{y: 10, height: 20}}
          animate={{
            opacity: hero.take_dmg ? 1 : 0,
          }}
          transition={{
            duration: 3,
            delay: 1,
          }}
          className="text-warning">{hero.take_skill_dmg ? "-" + hero.take_skill_dmg : ''}&nbsp;</motion.h1>
        <motion.h1
          initial={{y: 10, height: 20}}
          animate={{
            opacity: hero.take_dmg ? 1 : 0,
          }}
          transition={{
            type: "spring",
            bounce: 10,
            delay: 1.1,
            duration: 3,
          }}
          className="text-danger">{hero.take_dmg ? "-" + hero.take_dmg : ''}&nbsp;</motion.h1>
      </div>
      <motion.div className={styles.img}
                  key={hero.name}
                  animate={{
                    scale: !hero.take_dmg ? [0.5, 0.68] : 0.68,
                    opacity: !hero.take_dmg ? [0.5, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  initial={{
                    scale: 0.68
                  }}
                  exit={{
                    scale: 1,
                  }}
      >
        <img
          src={`/img/heroes/${hero?.name}.png`}
          alt="of the author"
          className="img-thumbnail"
        />
      </motion.div>
      <a onClick={() =>
        dispatch({
            type: placeBet.type,
            payload: {
              match_id: 1,
              hero_id: 1,
              balance: 999,
            }
          }
        )
      }
      >
        BET
      </a>
    </motion.div>
  </Tilt>
}

export default HeroTurn
