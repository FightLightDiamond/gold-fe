import styles from '../styles/card.module.css'
import '../styles/chart.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {getGoldCharts } from "../app/http/store/reducers/charts.slice";
import {Row,} from "react-bootstrap";
import {MDBTable, MDBTableBody, MDBTableHead, MDBTabs, MDBTabsItem, MDBTabsLink} from 'mdb-react-ui-kit';
import { useState } from 'react';

const Charts = () => {
  /**
   * Selector
   */
  const dispatch = useDispatch();
  const charts = useSelector((state: any) => state.charts);
  const {gold} = charts;
  const {items, loading} = gold
  const [activeId, setActiveId] = useState(null);
  const tab = [
    { id: 1, name: "Tài năng kiếm tiền", text: "gold" },
    { id: 2, name: "Thống kê hero", text: "hero" },
  ];
  const RANK_BOARD = [
    {
      key: 'FIRST',
      title: 'Hạng một',
      icon: 'http://localhost:3000/img/rank/rank-number-one.png',
      background: 'http://localhost:3000/img/rank/first-rank.png',
    },
    {
      key: 'SECOND',
      title: 'Hạng hai',
      icon: 'http://localhost:3000/img/rank/rank-number-two.png',
      background: 'http://localhost:3000/img/rank/second-rank.png',
    },
    {
      key: 'THIRD',
      title: 'Hạng ba',
      icon:'http://localhost:3000/img/rank/rank-number-three.png',
      background: 'http://localhost:3000/img/rank/third-rank.png',
    },
  ];
  const onActive = (id: any) => {
      setActiveId(id)
  }
  useEffectOnce(() => {
    dispatch({type: getGoldCharts.type})
  })

  return (
    <div className="chart-body">
        <MDBTabs justify className='mb-3'>
          { tab.map((item, index: number) => {
              return <MDBTabsItem className="tab-item" key={index}>
                      <MDBTabsLink className="text-bg-dark" onClick={() => onActive(item.id)} active={activeId === item.id}>
                        {item.name}
                      </MDBTabsLink>
                  </MDBTabsItem>
            })
          }
      </MDBTabs>
      { activeId === 1 &&
        <Row className={styles.body}>
        <div className="lesson-rank" >
            <div className="section">
              <div className="title">Xếp hạng của bạn:</div>
              <div className="section-people">
                <div className="header">
                  <div className="header-people">
                    <div className="number">my rank</div>
                    <img
                      className="img-people"
                      src="http://localhost:3000/img/rank/rank-number-one.png"
                      alt="image"
                    />

                    <div className="header-name">
                      <div className="name-user">my name</div>
                      <div className="name-rank">name rank</div>
                    </div>
                  </div>
                  <div className="point">
                    <div>{ }</div>
                    <div>
                      <img className="icon-gem" src="http://localhost:3000/img/rank/rank-number-one.png" />
                    </div>
                  </div>
                </div>
              </div>
            {
              items?.map((item: any, index: any) => {
                return   <div>
                  { index === 0 &&
                  <div className="section-peak">
                      <div className="peak">
                        <div><img className="icon-rank" src={RANK_BOARD[0].icon} /></div>
                        <div className="peak-people">
                          <div
                            className="first-rank"
                            style={{
                              backgroundImage: `url(${RANK_BOARD[0].background})`,
                            }}
                          >
                            <img
                              className="img-top-one"
                              src="http://localhost:3000/img/rank/rank-number-one.png"
                              alt="image"
                            />
                          </div>
                          <div className="peak-name">{ item.email }</div>
                          <div className="peak-rank">
                            <div className="peak-rank-name">{ item.title?.title }</div>
                          </div>
                        </div>
                        <div className="point-peak">
                          <div className="peak-icon"><img className="icon-gem" src="http://localhost:3000/img/rank/rank-number-one.png" /></div>
                          <div>{ item.balance}</div>
                        </div>
                    </div>
                  </div>
                  }
                    { index === 1 &&
                      <div className="section-list">
                        <div className="person">
                          <div className="info-person">
                            <div><img className="icon-rank" src={RANK_BOARD[1].icon} /></div>
                            <div
                              className="others-rank"
                              style={{
                                backgroundImage: `url(${RANK_BOARD[1].background})`,
                              }}
                            >
                              <img
                                className="img-others"
                                src="http://localhost:3000/img/rank/rank-number-one.png"
                                alt="image"
                              />
                            </div>
                            <div className="header-name">
                              <div className="username">{ item.email }</div>
                              <div className="name-rank">{ item.title?.title }</div>
                            </div>
                          </div>

                          <div className="point">
                            <div>{item.balance}</div>
                            <div><img className="icon-gem" src="http://localhost:3000/img/rank/rank-number-one.png" /></div>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      index === 2 &&
                      <div>
                        <div className="person">
                        <div className="info-person">
                          <div><img className="icon-rank" src={RANK_BOARD[2].icon} /></div>
                          <div
                            className="others-rank"
                            style={{
                              backgroundImage: `url(${RANK_BOARD[2].background})`,
                            }}
                          >
                            <img
                              className="img-others"
                              src="http://localhost:3000/img/rank/rank-number-one.png"
                              alt="image"
                            />
                          </div>
                          <div className="header-name">
                            <div className="username">{ item.email }</div>
                            <div className="name-rank">{ item?.title?.title }</div>
                          </div>
                        </div>
                        <div className="point">
                          <div>{item.balance}</div>
                          <div><img className="icon-gem" src="http://localhost:3000/img/rank/rank-number-one.png" /></div>
                        </div>
                      </div>
                      </div>
                    }
                    {
                      index >= 3 &&
                      <div className="person">
                        <div className="info-person">
                          <div className="order">{ index + 1 }</div>
                          <img
                            className="img-others"
                            src="http://localhost:3000/img/rank/rank-number-one.png"
                            alt="image"
                          />
                          <div className="header-name">
                            <div className="username">{ item.email }</div>
                            <div>
                              <div className="name-rank">{ item?.title?.title }</div>
                            </div>
                          </div>
                        </div>
                        <div className="point">
                          <div>{item.balance}</div>
                          <div><img className="icon-gem" src="http://localhost:3000/img/rank/rank-number-one.png" /></div>
                        </div>
                      </div>
                    }

                </div>
              })
            }
          </div>
        </div>
      </Row>
      }
      { activeId === 2 &&
      <Row className={styles.body}>
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
      }

    </div>
  )
}

export default Charts
