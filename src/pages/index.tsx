import {useDispatch, useSelector} from "react-redux";
import {memo, useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {IMatchState, index} from "../app/http/store/reducers/match.slice";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {Col, Row} from "react-bootstrap";
import HeroSelect from "../app/components/hero/hero-select";
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
    dispatch(index(""));
  });

  useEffect(() => {
    const a = async () => {
      if (items.length > 0) {
        await setMatch();
      }
    };
    a().catch(console.error);
  }, [items]);

  const setMatch = async () => {
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


  // const skill = (name: string) => {
  //   const skills: any = {
  //     Spinx: "Nếu nhỏ hơn 50% HP, tăng hút máu 30%, crit 20%",
  //     Chiron: "25% kháng nội tại, tăng 15% dame mỗi lượt khi còn dưới 60% HP",
  //     Hell: "Đối thủ chết luôn nếu nhỏ hơn 30% HP, 35% nếu bản thân nhỏ hơn 50%HP, 40% nếu máu nhỏ hơn 10%",
  //     Valkyrie: "mỗi turn đốt 2% máu cộng dồn tối đa 5 lần",
  //     Hera: "-30% atk khi đối phương kích hoạt nội tại, 60% kháng nội tại đối phương, +10 crit_rate khi máu nhỏ 40% HP",
  //     Darklord: "khi máu dưới 40% HP + 50% atk",
  //     Poseidon: "atk + 7% tối đa 10 lần",
  //     Phoenix: "máu dưới 40% hồi lại 60% HP, thủ tăng (2)",
  //     Fenrir: "5% crit rate, 15% crit_dame mỗi lượt",
  //   };
  //   return skills[name] ?? "";
  // };

  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <Row  className="justify-content-md-center" >
          <Col md="8" xs={24} className={styles.container} >
            {home && away ? <HeroSelect hero={home} away={away}/> : <Spinner variant="light" animation="border" />}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(Home);
