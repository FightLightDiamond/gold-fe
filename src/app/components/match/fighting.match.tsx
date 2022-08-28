import {memo, useEffect, useState} from "react";
import styles from "../../../styles/fighting-match.module.css";
import {Col, Row} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import {IMatchLog} from "../../interfaces/match-log.interface";
import HeroTurn from "../hero/hero-select";
import Countdown from "react-countdown";

const FightingMatch = ({items, start_time}: { items: any, start_time: number }) => {
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

  const renderer = ({ minutes, seconds }: {minutes: number, seconds: number }) => {
      return <span>{minutes}:{seconds}</span>;
  };

  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.container}>
          <div>
            {start_time}: <Countdown date={start_time} />
          </div>
          <div>
            ROUND: {home?.round}
          </div>
          <Row className={styles.card + " justify-content-md-center"}>
            <Col md="6">
              {home ? <HeroTurn hero={home}/> : <Spinner variant="light" animation="border"/>}
            </Col>
            <Col md="6">
              {away ? <HeroTurn hero={away}/> : <Spinner variant="light" animation="border"/>}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default memo(FightingMatch);
