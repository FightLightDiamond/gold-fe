import styles from '../styles/card.module.css'

import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getGoldCharts } from "../app/http/store/reducers/charts.slice";
import {Row,} from "react-bootstrap";
import {MDBTable, MDBTableBody, MDBTableHead} from 'mdb-react-ui-kit';

const Charts = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const charts = useSelector((state: any) => state.charts);
  const {gold} = charts;
  const {items, loading} = gold

  useEffectOnce(() => {
    dispatch({type: getGoldCharts.type})
  })

  return (
    <div>
      <Row className={styles.body}>
        <h1 className="text-info">Bảng xếp hạng</h1>
        <MDBTable className='table-dark'>
          <MDBTableHead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Richer Name</th>
              <th scope='col'>Money</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              !loading && items.length > 0 && items?.map((item: any, key: number) => {
                return <tr>
                  <th scope='row'>{key + 1}</th>
                  <td>{item.email}</td>
                  <td>${Intl.NumberFormat().format(item.balance)}</td>
                </tr>
              })
            }
          </MDBTableBody>
        </MDBTable>
      </Row>
    </div>
  )
}

export default Charts
