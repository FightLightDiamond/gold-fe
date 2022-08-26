import {put, takeLeading} from 'redux-saga/effects'
import {
  signIn,
  signInSuccess,
  signInFail,
} from '../reducers/auth.slice'

import authService from "../../services/auth.service";
import {IAction} from "../IAction";

function* signInWorker(action: IAction<any>): any {
  const [response, error] = yield authService.signIn(action.payload)

  if (error) {
    yield put({type: signInFail.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: signInSuccess.type, payload})
  }
}

function* authWatcher() {
  yield takeLeading(signIn.type, signInWorker)
}

export default authWatcher
