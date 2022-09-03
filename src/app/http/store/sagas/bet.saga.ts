import {put, takeLeading} from 'redux-saga/effects'
import {
  placeBet,
  placeBetSuccess,
  placeBetError,
  currentBet,
  currentBetError,
  currentBetSuccess,
} from '../reducers/bet.slice'

import betService from "../../services/bet.service";
import {IAction} from "../IAction";
import { updateBalance } from '../reducers/auth.slice';
import { toast } from 'react-toastify';

function* placeBetWorker(action: IAction<any>): any {
  const [response, error] = yield betService.store(action.payload)

  if (error) {
    yield put({type: placeBetError.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: placeBetSuccess.type, payload})
    yield put({type: updateBalance.type, payload: -action.payload.balance})
    toast("Place bet successfully!");
  }
}

function* currentBetWorker(action: IAction<any>): any {
  const [response, error] = yield betService.findByMatch(action.payload)

  if (error) {
    yield put({type: currentBetError.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: currentBetSuccess.type, payload})
  }
}

function* betWatcher() {
  yield takeLeading(placeBet.type, placeBetWorker)
  yield takeLeading(currentBet.type, currentBetWorker)
}

export default betWatcher
