import {useEffect, useState} from "react";
import styles from "../../../styles/fighting-match.module.css";
import {Col, Row} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import {IMatchLog} from "../../interfaces/match-log.interface";
import HeroTurn from "../hero/hero-select";
import Countdown from "react-countdown";

const FightingMatch = ({id, items, start_time}: { id: number, items: any, start_time: number }) => {
  /**
   * State
   */
  const [home, setHome] = useState<IMatchLog>();
  const [away, setAway] = useState<IMatchLog>();

  useEffect(() => {
    if (items.length > 0) {
      setMatch();
    }
  }, [items]);

  const setMatch = () => {
    let index = -1;
    const idHero = items[0].id

    const id = setInterval(() => {
      //Thể hiện hiệu ứng bên Đánh
      ++index
      if (items.length <= index) {
        console.log(items.length, index)
        clearInterval(id);
        return;
      }

      if (idHero === items[index].id) {
        setHome(items[index]);
      } else {
        setAway(items[index]);
      }


      //Đồng thời thể hiện bên chịu sát thương
      ++index
      if (items.length <= index) {
        console.log(items.length, index)
        clearInterval(id);
        return;
      }

      if (idHero === items[index].id) {
        setHome(items[index]);
      } else {
        setAway(items[index]);
      }

    }, 4000);
  };

  return (
    <div>
      <Row className="text-light">
        <Col xs="6">
          FIGHT TIME: <Countdown date={start_time}/>
        </Col>
        <Col xs="6">
          ROUND: {home?.turn_number}
        </Col>
      </Row>

      <Row className={styles.card + " justify-content-xs-center"}>
        <Col xs="6">
          {home ? <HeroTurn hero={home}/> : <Spinner variant="light" animation="border"/>}
        </Col>
        <Col xs="6">
          {away ? <HeroTurn hero={away}/> : <Spinner variant="light" animation="border"/>}
        </Col>
      </Row>
    </div>
  );
};

export default (FightingMatch);
