import {put, takeLatest} from 'redux-saga/effects'
import {
  fightEloMatch,
  fightEloMatchError,
  fightEloMatchSuccess,
  historiesEloMatch,
  historiesEloMatchError,
  historiesEloMatchSuccess
} from '../reducers/elo-match.slice'
import Service from "../../services/elo-match.service";
import {IAction} from "../IAction";
import {getCharts} from "../reducers/user-hero.slice";

/**
 * fightWorker
 * @param action
 */
function* fightWorker(action: IAction<any>): any {
  const [response, error] = yield Service.fight(action.payload)

  if (error) {
    yield put({type: fightEloMatchError.type})
  } else {

    const payload = response
    yield put({type: fightEloMatchSuccess.type, payload})
    yield put({type: getCharts.type})
  }
}

/**
 * getHistoriesWorker
 * @param action
 */
function* getHistoriesWorker(action: IAction<any>): any {
  const [response, error] = yield Service.fight(action.payload)

  if (error) {
    yield put({type: historiesEloMatchError.type})
  } else {

    const payload = response
    yield put({type: historiesEloMatchSuccess.type, payload})
    yield put({type: getCharts.type})
  }
}

/**
 * Watcher
 * @constructor
 */
function* Watcher() {
  yield takeLatest(fightEloMatch.type, fightWorker)
  yield takeLatest(historiesEloMatch.type, getHistoriesWorker)
}

export default Watcher
