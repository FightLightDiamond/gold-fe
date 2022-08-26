import {put, takeLeading} from 'redux-saga/effects'
import {
  bet,
  betSuccess,
  betError,
} from '../reducers/bet.slice'

import betService from "../../services/bet.service";
import {IAction} from "../IAction";

function* betWorker(action: IAction<any>): any {
  const [response, error] = yield betService.store(action.payload)

  if (error) {
    yield put({type: betError.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: betSuccess.type, payload})
  }
}

function* betWatcher() {
  yield takeLeading(bet.type, betWorker)
}

export default betWatcher
