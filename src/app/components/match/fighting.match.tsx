import {memo, useEffect, useState} from "react";
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
    /**
     * Tạm thời set tổng 1 pha đánh từ A -> B là 1 s
     */
    const id = setInterval(() => {
      //Thể hiện hiệu ứng bên Đánh
      ++index
      if (items.length <= index) {
        clearInterval(id);
        return;
      }
      // Phân tích dữ liệu thể hiện tấn công
      setHome(items[index]);

      //Đồng thời thể hiện bên chịu sát thương
      ++index
      if (items.length <= index) {
        clearInterval(id);
        return;
      }
      // Phân tích dữ liệu thể hiện chịu đòn
      setAway(items[index]);
    }, 5000);
  };

  return (
    <div>
      {/*<h3>Fighting</h3>*/}
      <div className={styles.body}>
        <div className={styles.container}>
          <Row className="text-light">
            <Col xs="6">
              <Countdown date={start_time} />
            </Col>
            <Col xs="6">
              ROUND: {home?.round}
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
      </div>
    </div>
  );
};

export default (FightingMatch);
