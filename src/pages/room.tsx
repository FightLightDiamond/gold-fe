import {socket} from "../app/http/ws";
import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMatch, getCurrentMatchSuccess, IMatchState} from "../app/http/store/reducers/match.slice";
import {RootState} from "../app/http/store";
import {BETTING_STATUS, FIGHTING_STATUS} from "../constants/bet-status.constant"
import FightingMatch from "../app/components/match/fighting.match";
import {useEffect, useState} from "react";
import Countdown from "react-countdown";

const Room = () => {
  const dispatch = useDispatch();
  const match: IMatchState = useSelector((state: RootState) => state.match);
  const {currentMatch} = match
  const {item} = currentMatch
  const {start_time} = item

  console.log({start_time, item})

  useEffectOnce(() => {
    socket.emit("joinRoom", "match");
    socket.emit("joinRoom", "all");

    // socket.on("joinedRoom", data => alert(data));

    socket.on("betting", data => {
      // console.log(data);
      // alert("betting");
      dispatch({
        type: getCurrentMatchSuccess.type,
        payload: data
      })
    });
    socket.on("matching", data => {
      // console.log(data);
      // alert("matching");
      dispatch({
        type: getCurrentMatchSuccess.type,
        payload: data
      })
    });
    socket.on("reward", data => {
      console.log(data);
    });

    dispatch({
      type: getCurrentMatch.type
    })
  });

  const [hero_info, setHeroInfo] = useState([])
  const [turns, setTurns] = useState([])

  useEffect(() => {
    if(item.status === BETTING_STATUS) {
      try {
        const hero_info = JSON.parse(item.hero_info)
        console.log({hero_info})
        setHeroInfo(hero_info)
      } catch (e) {

      }
    }
    if(item.status === FIGHTING_STATUS) {
      try {
        const turns = item.turns
        console.log({turns})
        setTurns(turns)
      } catch (e) {

      }
    }

  }, [item])

  return (
    <div className={"container"} style={{color: "#fff"}}>
      <h1>Room</h1>
      {start_time}: <Countdown date={start_time} />
      <div>
        {item.status}
      </div>
      <div>
        {
          item.status === BETTING_STATUS ? <FightingMatch start_time={parseInt(start_time) + 60* 2*1000} items={hero_info} />
          : item.status === FIGHTING_STATUS ? <FightingMatch start_time={parseInt(start_time) + 60* 4*1000 } items={turns} />  : "END_STATUS"
        }
      </div>
    </div>
  );
};

export default Room;
