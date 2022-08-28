import {put, takeLeading} from 'redux-saga/effects'
import {
  placeBet,
  placeBetSuccess,
  placeBetError,
} from '../reducers/bet.slice'

import betService from "../../services/bet.service";
import {IAction} from "../IAction";

function* betWorker(action: IAction<any>): any {
  const [response, error] = yield betService.store(action.payload)

  if (error) {
    yield put({type: placeBetError.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: placeBetSuccess.type, payload})
  }
}

function* betWatcher() {
  yield takeLeading(placeBet.type, betWorker)
}

export default betWatcher
