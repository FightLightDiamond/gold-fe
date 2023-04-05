import {useEffectOnce} from "../app/hooks/useEffectOnce";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMatch, IMatchState} from "../app/http/store/reducers/match.slice";
import {RootState} from "../app/http/store";
import {BETTING_STATUS, FIGHTING_STATUS} from "../constants/bet-status.constant"
import FightingMatch from "../app/components/match/fighting.match";
import {memo, useEffect, useState} from "react";
import BettingMatch from "../app/components/match/betting.match";

const Home = () => {
  const dispatch = useDispatch();
  const match: IMatchState = useSelector((state: RootState) => state.match);
  const {currentMatch} = match
  const {item} = currentMatch
  const {start_time, id} = item

  useEffectOnce(() => {
    dispatch({
      type: getCurrentMatch.type
    })
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
            : item.status === FIGHTING_STATUS ? <FightingMatch start_time={parseInt(start_time) + 60*3*1000 } items={turns} />  : "END_STATUS"
        }
      </div>
    </div>
  );
};

export default memo(Home);
