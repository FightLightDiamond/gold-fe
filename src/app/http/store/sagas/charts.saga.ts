import {put, takeLeading} from 'redux-saga/effects'
import {
  getGoldCharts,
  getGoldChartsError,
  getGoldChartsSuccess
} from '../reducers/charts.slice'

import chartsService from "../../services/charts.service";
import {IAction} from "../IAction";

function* chartsWorker(action: IAction<any>): any {
  const [response, error] = yield chartsService.gold()


  if (error) {
    yield put({type: getGoldChartsError.type})
  } else {
    const {data} = response
    const payload = data ?? response

    console.log({response, error, payload})
    yield put({type: getGoldChartsSuccess.type, payload})
  }
}

function* chartsWatcher() {
  yield takeLeading(getGoldCharts, chartsWorker)
}

export default chartsWatcher
