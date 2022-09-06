import styles from '../styles/card.module.css'

import { motion } from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getHeroes} from "../app/http/store/reducers/hero.slice";
import {Col, Row, Card, Button} from "react-bootstrap";
import { useState } from 'react';

const Heroes = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const hero = useSelector((state: any) => state.hero);
  const {heroes} = hero;
  const {items, loading} = heroes
  const [activeId, setActiveId] = useState(Array);
  const onDetail = (index: any) => {
    if (activeId.includes(index)) {
      setActiveId(activeId => activeId.filter(e => e !== index))
    } else {
      setActiveId(activeId => [...activeId,index])
    }
  }

  useEffectOnce(() => {
    dispatch({type: getHeroes.type})
  })

  return (
    <div>
      <Row className={styles.body}>
        {
          !loading && items.length > 0 && items?.map((item: any, index: number) => {
            return <Col md={3} xs={12} style={{marginTop: '25px'}} key={index}>
              <Card className={styles.card}>
                <motion.div style={{  position: 'relative' }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                >
                  <Card.Img className={styles.imgBx} variant="top" src={`/img/heroes/${item.name}.png`} />
                  <div className={styles.overlay} style={{display: activeId.includes(index) ? 'flex' : 'none'}}>
                    <div className={styles.text}> {item.story}</div>
                  </div>
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
