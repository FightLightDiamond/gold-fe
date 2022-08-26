import styles from "../styles/shooter.module.css";
import {useEffect, useState} from "react";
import gsap from "gsap";
import {Projectile} from "./shooter/Projectile";
import Particle from "./shooter/Particle";
import Enemy from "./shooter/Enemy";
import Player from "./shooter/Player";
// gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);

/**
 * - Create a player
 * - Shoot projectiles
 * - Create enemies
 * - Detect collision on enemy / projectile hit
 * - Detect collision on enemy / player hit
 * - Remove off screen projectiles
 * - Colorize game
 * - Shrink enemies on hit
 * - Create particle explosion on hit
 * - Add score
 * - Add game over UI
 * - Add restart button
 * - Add start game button
 * @constructor
 */
const Shooter = () => {
  const [score, setScore] = useState(0)
  const [id, setId] = useState<NodeJS.Timer>()

  useEffect(() => {

  }, [])

  const handleStart = () => {
    const canvas: HTMLCanvasElement | null = document.querySelector('canvas')
    let c: CanvasRenderingContext2D | null = null;

    if (canvas) {
      c = canvas.getContext('2d')
      canvas.width = innerWidth
      canvas.height = innerHeight
    }

    if (canvas && c) {
      // const p = new Projectile(canvas.width /2 , canvas.height/2, 5, 'red', {x: 1, y: 1})
      let ps: Projectile[] = []
      let enemies: Enemy[] = []
      let particles: Particle[] = []

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      const player = new Player(x, y, 10, 'white');
      player.draw(c)

      /**
       * Summon
       */
      const spawnEnemies = () => {
        return setInterval(() => {
          const radius = Math.random() * 30 + 10;
          let x
          let y

          if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : radius + canvas.width;
            y = Math.random() * canvas.height;
          } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : radius + canvas.height;
          }

          const color = `hsl(${Math.random() * 300 + 60}, 50%, 50%)`;
          const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
          )
          const v = {
            x: Math.cos(angle),
            y: Math.sin(angle)
          }
          /**
           * Summon
           */
          enemies.push(new Enemy(x, y, radius, color, v))
          console.log('go')
        }, 1000)
      }

      /**
       * Animate
       */
      let animationId: number
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        if (c && animationId) {
          c.fillStyle = 'rgba(0, 0, 0, 0.1)'
          c.fillRect(0, 0, canvas.width, canvas.height)
          // c.clearRect(0, 0, canvas.width, canvas.height)
          /**
           * Player draw
           */
          player.draw(c)

          /**
           * Vụ nổ
           */
          particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
              particles.splice(index, 1)
            } else {
              c && particle.update(c)
            }
          })

          /**
           * Dan draw
           */
          ps.forEach((p, pIndex) => {
            c && p.update(c)
            // remove form edges of screen
            if (
              p.x + p.radius < 0 || p.x - p.radius > canvas.width ||
              p.y + p.radius < 0 || p.y - p.radius > canvas.width
            ) {
              setTimeout(() => {
                ps.splice(pIndex, 1)
              })
            }
          })

          /**
           * Thiên thạch
           */
          enemies.forEach((enemy, index) => {
            c && enemy.update(c)
            const dist2 = Math.hypot(player.x - enemy.x, player.y - enemy.y)

            /**
             * End game
             */
            if (dist2 - enemy.radius - player.radius < 1) {
              // clearInterval(id)
              cancelAnimationFrame(animationId)
              // enemies = []
              // ps = []
              console.log('end game')
            }

            ps.forEach((p, pIdex) => {
              const dist = Math.hypot(
                p.x - enemy.x,
                p.y - enemy.y
              )
              // when projectiles touch enemy
              if (dist - enemy.radius - p.radius < 1) {
                //create explosions
                // Va chạm tạo ra vụ nổ
                for (let i = 0; i < enemy.radius * 2; i++) {
                  particles.push(new Particle(p.x, p.y, Math.random() * 2, enemy.color, {
                    /**
                     * Tốc độ chuyển động
                     */
                    x: (Math.random() - 0.5) * (Math.random() * 8),
                    y: (Math.random() - 0.5) * (Math.random() * 8),
                  }))
                }

                if (enemy.radius - 10 > 10) {
                  gsap.to(enemy, {
                    radius: enemy.radius - 15
                  })
                  setTimeout(() => {
                    ps.splice(pIdex, 1)
                  }, 0)
                } else {
                  setTimeout(() => {
                    setScore(prevState => ++prevState)
                    enemies.splice(index, 1)
                    ps.slice(pIdex, 1)
                  }, 0)
                }
              }
            })
          })
        }
      }

      /**
       * ================ Event
       */
      window.addEventListener('click', (e) => {
        const angle = Math.atan2(
          e.clientY - canvas.height / 2,
          e.clientX - canvas.width / 2
        )
        const v = {
          x: Math.cos(angle) * 4,
          y: Math.sin(angle) * 4
        }
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', v))
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2 - 25, 5, 'white', v))
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2 + 25, 5, 'red', v))
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2 - 75, 5, 'white', v))
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2 + 725, 5, 'red', v))
        // ps.push(new Projectile(canvas.width/2  + 25 , canvas.height/2, 5, 'red', v))
        // ps.push(new Projectile(canvas.width/2  - 25  , canvas.height/2, 5, 'red', v))
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2 - 50, 5, 'white', v))
        ps.push(new Projectile(canvas.width / 2, canvas.height / 2 + 50, 5, 'red', v))
        // ps.push(new Projectile(canvas.width/2  + 50 , canvas.height/2, 5, 'red', v))
        // ps.push(new Projectile(canvas.width/2  - 50  , canvas.height/2, 5, 'red', v))
      })

      animate()
      const id: NodeJS.Timer = spawnEnemies()
      setId(id)
    }
  }

  return (
    <div className={styles.body}>
      <div className={'position-fixed text-info text-sm ml-2'}><span>Score: </span> <span> {score}</span></div>
      <div className={'mx-auto d-flex align-items-center justify-content-center'}>
        <div className={'bg-light'}>
          <h1>{score}</h1>
          <p>Points</p>
          <div>
            <button className={'btn btn-primary'} onClick={handleStart}>Start game</button>
          </div>

        </div>
      </div>
      <canvas></canvas>
    </div>
  )
}

export default Shooter
