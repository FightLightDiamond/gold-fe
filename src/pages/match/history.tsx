import {useDispatch, useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import {MDBTable, MDBTableBody, MDBTableHead} from 'mdb-react-ui-kit';
import {useEffectOnce} from "../../app/hooks/useEffectOnce";
import { getMatches } from "../../app/http/store/reducers/match.slice";
import moment from "moment";
import { Pagination } from "react-bootstrap";
import {useState} from "react";


const hee = new Map();
hee.set(1, 'Fenrir')
hee.set(2, 'Phoenix')
hee.set(3, 'Hell')
hee.set(4, 'Darklord')
hee.set(5, 'Valkyrie')
hee.set(6, 'Poseidon')
hee.set(7, 'Hera')
hee.set(8, 'Chiron')

const History = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const match = useSelector((state: any) => state.match);
  const {items, loading} = match

  useEffectOnce(() => {
    dispatch({type: getMatches.type})
  })

  const convertDate = (start_time: number) => {
    const date = moment.unix(start_time/1000)
    return date.format('DD-MM-YYYY HH:mm:ss')
  }
  const [page, setPage] = useState<number>(1)

  return (
    <div>
      <Row>
        <h1 className="text-light">Lịch sử trận đấu</h1>
        {
          loading ? "Loading" :<div>
            <MDBTable className='table-dark'>
              <MDBTableHead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Winner</th>
                  <th scope='col'>Loser</th>
                  <th scope='col'>No.Turn</th>
                  <th scope='col'>Time</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                   items?.items?.map((item: any, key: number) => {
                    return <tr key={key}>
                      <th scope='row'>{key + 1}</th>
                      <td>{hee.get(item.winner)}</td>
                      <td>{hee.get(item.loser)}</td>
                      <td>{item.turn_number}</td>
                      <td>{convertDate(Number(item.start_time))}</td>
                    </tr>
                  })
                }
              </MDBTableBody>
            </MDBTable>
            <Pagination className="text-light">
              <Pagination.Prev onClick={() => {
                setPage(prevState => prevState - 1)
                dispatch({type: getMatches.type, payload: {page}})
              }} className="text-light" />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => {
                setPage(prevState => prevState + 1)
                dispatch({type: getMatches.type, payload: {page}})
              }}/>
            </Pagination>
          </div>
        }

      </Row>
    </div>
  )
}

export default History
