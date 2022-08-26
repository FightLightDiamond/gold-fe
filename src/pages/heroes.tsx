import styles from '../styles/card.module.css'

import { motion } from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getHeroes} from "../app/http/store/reducers/hero.slice";
import {Col, Row, Card, Button} from "react-bootstrap";

const Heroes = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const hero = useSelector((state: any) => state.hero);
  const {heroes} = hero;
  const {items, loading} = heroes

  useEffectOnce(() => {
    dispatch({type: getHeroes.type})
  })

  return (
    <div>
      <Row className={styles.body}>
        {
          !loading && items.length > 0 && items?.map((item: any) => {
            return <Col md={3} xs={12} style={{  zIndex: 99, marginTop: '25px'}}>
              <Card className={styles.card}>
                <motion.div
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                >
                  <Card.Img className={styles.imgBx} variant="top" src={`http://localhost:3000/img/heroes/${item.name}.png`} />
                </motion.div>
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  {/*<Card.Text>*/}
                  {/*  {item.skill}*/}
                  {/*</Card.Text>*/}
                  <Button variant="dark">Detail</Button>
                </Card.Body>
              </Card>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default Heroes
