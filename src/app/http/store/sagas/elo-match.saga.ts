import {put, takeLatest, call} from 'redux-saga/effects'
import {
  fightEloMatch,
  fightEloMatchError,
  fightEloMatchSuccess,
} from '../reducers/elo-match.slice'
import Service from "../../services/match.service";
import {IAction} from "../IAction";

function* fightWorker(action: IAction<any>): any {
  const [response, error] = yield Service.index(action.payload)

  if (error) {
    yield put({type: fightEloMatchError.type})
  } else {
    // const {data} = response
    const payload = response
    yield put({type: fightEloMatchSuccess.type, payload})
    // yield call()
  }
}


function* Watcher() {
  yield takeLatest(fightEloMatch.type, fightWorker)
}

export default Watcher
