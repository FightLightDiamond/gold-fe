import styles from "../../../styles/Home.module.css";
import {Tilt} from "../Tilt";
import {motion} from "framer-motion";
import {IMatchLog} from "../../interfaces/match-log.interface";
import {ProgressBar} from "react-bootstrap";

const skills: any = {
  Chiron: "tăng atk bằng 80% tỉ lệ % máu bị mất. Ví dụ máu giảm 50% tăng 40% atk, giảm về 90% tăng 72% dame",
  Hell: "1. Đối thủ chết luôn nếu HP nhỏ hơn 30%. 2. Khi bản thân HP < 70% và máu ít đối thủ, tăng dame 10% bằng lượng (hp đối phương - hp bản thân) ",
  Valkyrie: "mỗi turn đốt 2% máu cộng dồn tối đa 5 lần",
  Hera: "1. -25% atk đối phương khi kích hoạt nội tại. 2. Máu dưới 80%:  33% kháng nội tại đối phương, ngược lại 67% tăng 20% def và 15% crit dmg",
  Darklord: "khi máu dưới 40% HP, +55% atk và +50% def",
  Poseidon: "atk +7% tối đa 10 lần, tăng 2% def",
  Phoenix: "máu dưới 60% hồi lại 40% HP bị mất, x2 def, cộng thêm 20% tỉ lệ crit",
  Fenrir: "5% crit rate, 15% crit_dame mỗi lượt",
}

const HeroTurn = ({hero}: { hero: IMatchLog }) => {
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
          className="text-warning text-center">{hero.take_skill_dmg ? "-" + hero.take_skill_dmg : ''}&nbsp;</motion.h1>
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
          className="text-danger text-center">{hero.take_dmg ? "-" + hero.take_dmg : ''}&nbsp;</motion.h1>
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
      <p className="text-light text-center">Nội tại: {skills[hero.name]}</p>
    </motion.div>
  </Tilt>
}

export default HeroTurn
