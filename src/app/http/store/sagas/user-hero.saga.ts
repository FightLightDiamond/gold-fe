import {put, takeLeading} from 'redux-saga/effects'
import {
  getCharts,
  getChartsError,
  getChartsSuccess,
  selectHero,
  selectHeroError,
  selectHeroSuccess,
  upPointHero,
  upPointHeroError,
  upPointHeroSuccess,
  upLevelHero,
  upLevelHeroError,
  upLevelHeroSuccess,
} from '../reducers/user-hero.slice'

import userHeroService from "../../services/user-hero.service";
import {IAction} from "../IAction";

function* getChartsWorker(action: IAction<any>): any {
  const [response, error] = yield userHeroService.getCharts(action.payload)

  if (error) {
    yield put({type: getChartsError.type})
  } else {
    const {data} = response
    const payload = data ?? response
    yield put({type: getChartsSuccess.type, payload})
  }
}

function* selectHeroWorker(action: IAction<any>): any {
  const [response, error] = yield userHeroService.selectHero(action.payload)

  if (error) {
    yield put({type: selectHeroError.type})
  } else {
    const {data} = response
    const payload = data ?? response

    console.log({response, error, payload})
    yield put({type: upPointHeroSuccess.type, payload})
  }
}

function* upPointWorker(action: IAction<any>): any {
  const {id, body} = action.payload
  const [response, error] = yield userHeroService.addPoint(id, body)

  if (error) {
    yield put({type: upPointHeroError.type})
  } else {
    const {data} = response
    const payload = data ?? response

    console.log({response, error, payload})
    yield put({type: selectHeroSuccess.type, payload})
  }
}

function* upLevelWorker(action: IAction<any>): any {
  const {id, body} = action.payload
  const [response, error] = yield userHeroService.levelUp(id, body)

  if (error) {
    yield put({type: upLevelHeroError.type})
  } else {
    const {data} = response
    const payload = data ?? response

    console.log({response, error, payload})
    yield put({type: upLevelHeroSuccess.type, payload})
  }
}

function* userHeroWatcher() {
  yield takeLeading(getCharts.type, getChartsWorker)
  yield takeLeading(selectHero.type, selectHeroWorker)
  yield takeLeading(upPointHero.type, upPointWorker)
  yield takeLeading(upLevelHero.type, upLevelWorker)
}

export default userHeroWatcher
