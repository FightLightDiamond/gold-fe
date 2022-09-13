import {WS} from "../app/http/ws";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMatch, getCurrentMatchSuccess, IMatchState} from "../app/http/store/reducers/match.slice";
import {RootState} from "../app/http/store";
import {BETTING_STATUS, FIGHTING_STATUS} from "../constants/bet-status.constant"
import FightingMatch from "../app/components/match/fighting.match";
import {memo, useEffect, useState} from "react";
import BettingMatch from "../app/components/match/betting.match";
import * as __ from 'lodash'
import { updateBalance } from "../app/http/store/reducers/auth.slice";
import {toast} from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const match: IMatchState = useSelector((state: RootState) => state.match);
  const auth = useSelector((state: RootState) => state.auth);
  const {currentMatch} = match
  const {item} = currentMatch
  const {start_time, id} = item

  useEffectOnce(() => {
    dispatch({
      type: getCurrentMatch.type
    })

    const getWS = async () => {
      const socket = await WS.getSocket()
      socket.on("connect", () => {
        socket.emit("joinRoom", "match");
        socket.emit("joinRoom", "all")

        socket.on("betting", (data: any) => {
          dispatch({
            type: getCurrentMatchSuccess.type,
            payload: data
          })
          toast(`The match is betting`, );
        });
        socket.on("matching", (data: any) => {
          toast(`The match is fighting`);
          dispatch({
            type: getCurrentMatchSuccess.type,
            payload: data
          })
        });
        socket.on("reward", (data: any) => {
          const reward: any = __.find(data, (o) => {
            return o.user_id === auth.user.id
          })
          if(reward) {
            console.log("reward.balance * 2", reward, reward.balance * 2)

            toast(`Congratulations on winning and earning $${reward.balance}!`);
            dispatch({
              type: updateBalance.type,
              payload: reward.balance * 2
            })
            console.log("reward", data);
          }
        });
      })
    }

    void getWS();
  });

  const [hero_info, setHeroInfo] = useState([])
  const [turns, setTurns] = useState([])

  useEffect(() => {
    if(item.status === BETTING_STATUS) {
      const hero_info = item.hero_info
      setHeroInfo(hero_info)
    }
    if(item.status === FIGHTING_STATUS) {
      const turns = item.turns
      setTurns(turns)
    }
  }, [item.id, item.status])

  return (
    <div className={"container"}>
      <div>
        {
          item.status === BETTING_STATUS ? <BettingMatch id={id} start_time={parseInt(start_time) + 60*1000} items={hero_info} />
            : item.status === FIGHTING_STATUS ? <FightingMatch id={id} start_time={parseInt(start_time) + 60*3*1000 } items={turns} />  : "END_STATUS"
        }
      </div>
    </div>
  );
};

export default memo(Home);
