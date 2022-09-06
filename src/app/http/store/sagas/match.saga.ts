import {put, takeLatest, call} from 'redux-saga/effects'
import {
  getCurrentMatch,
  getCurrentMatchError,
  getCurrentMatchSuccess,
  getMatches,
  getMatchesError,
  getMatchesSuccess,
	setTurn,
	setIntervalID,
} from '../reducers/match.slice'
import Service from "../../services/match.service";
import {IAction} from "../IAction";
import {BETTING_STATUS, FIGHTING_STATUS} from "../../../../constants/bet-status.constant";

function* indexWorker(action: IAction<any>): any {
  const [response, error] = yield Service.index(action.payload)

  if (error) {
    yield put({type: getMatchesError.type})
  } else {
    // const {data} = response
    const payload = response
    yield put({type: getMatchesSuccess.type, payload})
  }
}

function* getCurrentMatchWorker(action: IAction<any>): any {
  const [response, error] = yield Service.getCurrentMatch()

  if (error) {
    yield put({type: getCurrentMatchError.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: getCurrentMatchSuccess.type, payload})

    if (payload.status === BETTING_STATUS) {
      const hero_info = payload.hero_info
    }

    if (payload.status === FIGHTING_STATUS) {
      const items = payload.turns
      const idHero = items[0].id

      let index = -1;

			// const runner = yield call(setInterval, () => {
			// 	yield put({type: setIntervalID.type, payload: intervalID})
			// }, 1000);

      const intervalID = setInterval(() => {
        //Thể hiện hiệu ứng bên Đánh
				const turn = {
        	home: {},
        	away: {}
				}
				++index
        if (items.length <= index) {
          clearInterval(intervalID);
          return;
        }

        if (idHero === items[index].id) {
					turn.home = items[index]
        } else {
					turn.away = items[index]
        }

				++index
				if (items.length <= index) {
					clearInterval(intervalID);
					return;
				}

				if (idHero === items[index].id) {
					turn.home = items[index]
				} else {
					turn.away = items[index]
				}

				put({type: setTurn.type, payload: intervalID})


      }, 5000);

			yield put({type: setIntervalID.type, payload: intervalID})
    }
  }
}


function* Watcher() {
  yield takeLatest(getMatches.type, indexWorker)
  yield takeLatest(getCurrentMatch.type, getCurrentMatchWorker)
}

export default Watcher
