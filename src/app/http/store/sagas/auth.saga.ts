import {put, takeLeading} from 'redux-saga/effects'
import {
  signIn,
  signInSuccess,
  signInFail,
  signUp,
  signUpFail,
  signUpSuccess,
  profile,
  profileSuccess,
  profileFail,
} from '../reducers/auth.slice'

import authService from "../../services/auth.service";
import {IAction} from "../IAction";
import {toast} from "react-toastify";

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

function* signUpWorker(action: IAction<any>): any {
  const [response, error] = yield authService.signUp(action.payload)

  if (error) {
    yield put({type: signUpFail.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: signUpSuccess.type, payload})
    toast("Place bet successfully!");
  }
}

function* profileWorker(action: IAction<any>): any {
  const [response, error] = yield authService.profile(action.payload)

  if (error) {
    yield put({type: profileFail.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: profileSuccess.type, payload})
  }
}

function* authWatcher() {
  yield takeLeading(signUp.type, signUpWorker)
  yield takeLeading(signIn.type, signInWorker)
  yield takeLeading(profile.type, profileWorker)
}

export default authWatcher
