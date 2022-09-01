import styles from '../styles/card.module.css'

import { motion } from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getGoldCharts } from "../app/http/store/reducers/charts.slice";
import {Col, Row, Card, Button} from "react-bootstrap";
import {MDBTable, MDBTableBody, MDBTableHead} from 'mdb-react-ui-kit';

const Heroes = () => {
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
        <h1 className="text-light">Tai nang kiem tien</h1>
        <MDBTable className='table-dark'>
          <MDBTableHead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Email</th>
              <th scope='col'>Balance</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              !loading && items.length > 0 && items?.map((item: any, key: number) => {
                return <tr>
                  <th scope='row'>{key + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.balance}</td>
                </tr>
              })
            }
          </MDBTableBody>
        </MDBTable>
      </Row>
    </div>
  )
}

export default Heroes
