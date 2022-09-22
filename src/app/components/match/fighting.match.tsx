import { memo, useEffect, useState } from "react";
import styles from "../../../styles/fighting-match.module.css";
import { Col, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { IMatchLog } from "../../interfaces/match-log.interface";
import HeroTurn from "../hero/hero-select";
import Countdown from "react-countdown";
import { MDBBtn } from "mdb-react-ui-kit";

const FightingMatch = ({ items, start_time }: { items: any, start_time: number }) => {
  /**
   * State
   */
  const [home, setHome] = useState<IMatchLog>();
  const [away, setAway] = useState<IMatchLog>();
  const [speed, setSpeed] = useState<number>(1);

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

    }, 4000 / speed);
  };

  return (
    <div className={styles.container}>
      <Row className="text-light">
        <Col xs="6">
          FIGHT TIME: <Countdown date={start_time} />
        </Col>
        <Col xs="6">
          ROUND: {home?.turn_number}
        </Col>
      </Row>

      <Row className={styles.card + " justify-content-xs-center"}>
        <Col xs="6">
          {home ? <HeroTurn hero={home} /> : <Spinner variant="light" animation="border" />}
        </Col>
        <Col xs="6">
          {away ? <HeroTurn hero={away} /> : <Spinner variant="light" animation="border" />}
        </Col>
      </Row>
      <Row className="text-light">
        <Col xs="6">
          <MDBBtn block color="dark" type='button' outline={speed === 2}
            onClick={() => setSpeed(speed === 2 ? 1 : 2)}>
            x2
          </MDBBtn>
          <MDBBtn block color="dark" type='button' outline={speed === 4}
            onClick={() => setSpeed(speed === 4 ? 1 : 4)}>
            x4
          </MDBBtn>
          <MDBBtn block color="dark" type='button' outline={speed === 8}
            onClick={() => setSpeed(speed === 8 ? 1 : 8)}>
            x8
          </MDBBtn>
        </Col>
      </Row>
    </div>
  );
};

export default memo(FightingMatch);
