import styles from '../styles/card.module.css'
import '../styles/chart.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getCharts} from "../app/http/store/reducers/user-hero.slice";
import {fightEloMatch} from "../app/http/store/reducers/elo-match.slice";
import {Row,} from "react-bootstrap";
import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody, MDBTableHead,
} from 'mdb-react-ui-kit';

const EloMatchCharts = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const userHero = useSelector((state: any) => state.userHero);
  const {charts} = userHero;
  const {items, loading} = charts;
  console.log("items", items)

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
                return <tr>
                  <td scope='row'>{key + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.hero}</td>
                  {/*<td>{item.level}</td>*/}
                  <td>{item.elo}</td>
                  <td>
                    <MDBBtn className='mx-2' color='secondary'>
                      <MDBIcon onClick={() => dispatch({
                        type:fightEloMatch.type,
                        payload: {
                          competitor: item.id
                        }
                      })} fas icon="skull-crossbones" />
                  </MDBBtn></td>
                </tr>
              })
            }
          </MDBTableBody>
        </MDBTable>
      </Row>
    </div>
  )
}

export default EloMatchCharts
