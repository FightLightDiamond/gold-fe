import {useEffect, useState} from "react";
import styles from "../../../styles/fighting-match.module.css";
import {Col, Row} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import {IMatchLog} from "../../interfaces/match-log.interface";
import HeroTurn from "../hero/hero-select";
import Countdown from "react-countdown";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle
} from "mdb-react-ui-kit";
import {currentBet, IBetState, placeBet} from "../../http/store/reducers/bet.slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../http/store";

const BettingMatch = ({id, items, start_time}: { id: number, items: any, start_time: number }) => {
  const bet: IBetState = useSelector((state: RootState) => state.bet);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  /**
   * State
   */
  const [home, setHome] = useState<IMatchLog>();
  const [away, setAway] = useState<IMatchLog>();

  useEffect(() => {
    if (items.length > 1) {
      setHome(items[0])
      setAway(items[1])
    }
  }, [items]);

  useEffect(() => {
    //Get bet buy match id
    if (auth.isAuthentication) {
      dispatch({
        type: currentBet.type,
        payload: {
          match_id: id
        }
      })
    }
  }, [id, auth])

  useEffect(() => {
    if (bet.bet.item?.id) {
      setCentredModal(false)
    }
  }, [bet.bet.item])

  const [balance, setBalance] = useState<number>(1000);
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const handleBet = (hero_id: number | undefined) => {
    dispatch({
        type: placeBet.type,
        payload: {
          match_id: id,
          hero_id: hero_id,
          balance: balance,
        }
      }
    )
  }

  return (
    <div>
      <Row className="text-light">
        <Col xs="6">
          BET TIME: <Countdown date={start_time}/>
        </Col>
      </Row>
      <Row className={styles.card + " justify-content-md-center"}>
        <Col md="6">
          {home ? <HeroTurn hero={home}/> : <Spinner variant="light" animation="border"/>}
        </Col>
        <Col md="6">
          {away ? <HeroTurn hero={away}/> : <Spinner variant="light" animation="border"/>}
        </Col>
      </Row>
      {
        !bet.bet.item ? <Row className={"justify-content-md-center"}>
          <MDBBtn onClick={toggleShow}>BET</MDBBtn>
        </Row> : ''
      }

      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Betting</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <MDBInput onChange={(e) => setBalance(parseInt(e.target.value))}
                          className='mb-4' defaultValue={1000} type='number' label='Gold for bet'/>
                <Row>
                  <Col className='xs-6'>
                    <MDBBtn block outline color="success" type='button'
                            onClick={() => handleBet(home?.id)}
                    >
                      {home?.name}
                    </MDBBtn>
                  </Col>
                  <Col className='xs-6'>
                    <MDBBtn block outline color="danger" type='button' onClick={() => handleBet(away?.id)}>
                      {away?.name}
                    </MDBBtn>
                  </Col>
                </Row>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default (BettingMatch);
