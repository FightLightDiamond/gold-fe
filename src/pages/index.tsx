import {useDispatch, useSelector} from "react-redux";
import {memo, useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {IMatchState, index} from "../app/http/store/reducers/match.slice";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {Col, Row} from "react-bootstrap";
import HeroTurn from "../app/components/hero/hero-select";
import {IMatchLog} from "../app/interfaces/match-log.interface";
import {RootState} from "../app/http/store";
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const match: IMatchState = useSelector((state: RootState) => state.match);
  const items: IMatchLog[] = match.items;

  /**
   * State
   */
  const [home, setHome] = useState<IMatchLog>();
  const [away, setAway] = useState<IMatchLog>();

  /**
   * useEffect
   */
  useEffectOnce(() => {
    dispatch({
      type: index.type
    });
  });

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
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.container}>
          <Row className={styles.card + " justify-content-md-center"}>
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

export default memo(Home);
