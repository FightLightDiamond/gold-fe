import styles from '../styles/card.module.css'
import '../styles/chart.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getCharts} from "../app/http/store/reducers/user-hero.slice";
import {fightEloMatch} from "../app/http/store/reducers/elo-match.slice";
import {Row,} from "react-bootstrap";
import {
  MDBBtn,
  MDBIcon, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle,
  MDBTable,
  MDBTableBody, MDBTableHead,
} from 'mdb-react-ui-kit';
import {useEffect, useState} from "react";
import FightingMatch from "../app/components/match/fighting.match";
import Container from "react-bootstrap/Container";

const EloMatchCharts = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const userHero = useSelector((state: any) => state.userHero);
  const {charts} = userHero;
  const {items, loading} = charts;
  const eloMatch = useSelector((state: any) => state.eloMatch);
  const {fight} = eloMatch;
  const {match} = fight;

  useEffect(() => {
    if(match) {
      setFullscreenEloMatch(true)
    }
  }, [match])

  /**
   * Modal
   */
  const [fullscreenXlModal, setFullscreenEloMatch] = useState(false);
  const toggleShow = () => setFullscreenEloMatch(!fullscreenXlModal);

  useEffectOnce(() => {
    dispatch({type: getCharts.type})
  })

  return (
    <div className="chart-body">
      <h1 className="text-light">Bảng xếp hạng bậc đế vương</h1>
      <Row className={styles.body}>
        <MDBTable className='table-dark'>
          <MDBTableHead>
        <tr>
          <th>#</th>
          <th>THE KING</th>
          <th>HERO</th>
          {/*<th>LEVEL</th>*/}
          <th>ELO</th>
          <th>FIGHTING</th>
        </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              !loading && items?.items?.length > 0 && items?.items?.map((item: any, key: number) => {
                return <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.hero}</td>
                  {/*<td>{item.level}</td>*/}
                  <td>{item.elo}</td>
                  <td>
                    <MDBBtn  onClick={() => dispatch({
                      type:fightEloMatch.type,
                      payload: {
                        competitor: item.id
                      }
                    })}  disabled={loading} className='mx-2' color='secondary'>
                      <MDBIcon fas icon="skull-crossbones" />
                  </MDBBtn></td>
                </tr>
              })
            }
          </MDBTableBody>
        </MDBTable>
      </Row>

      <MDBModal tabIndex='-1' show={fullscreenXlModal} setShow={setFullscreenEloMatch}>
        <MDBModalDialog size='fullscreen'>
          <MDBModalContent className="war_back_ground">
            <MDBModalHeader>
              <MDBModalTitle className="text-center text-warning">
                Battle of the Kings. Who will unify them all, glorious emperor?</MDBModalTitle>
              <MDBBtn
                type='button'
                className='btn-close'
                color='warning'
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Container>
                {
                  !fight.loading && match?.turns.length > 0 && <FightingMatch start_time={Number(Date.now()) + 60* 2*1000 } items={match.turns} />
                }
              </Container>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default EloMatchCharts
