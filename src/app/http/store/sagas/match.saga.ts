import {put, takeLatest} from 'redux-saga/effects'
import {
	index,
	indexError,
	indexSuccess,
	betting,
	bettingError,
	bettingSuccess
} from '../reducers/match.slice'
import Service from "../../services/match.service";
import {IAction} from "../IAction";

function* indexWorker(action: IAction<any>): any {
	const [response, error] = yield Service.index(action.payload)
	console.log(response, error)
	if (error) {
		yield put({type: indexError.toString()})
	} else {
			// const {data} = response
			const payload = response
			yield put({type: indexSuccess.type, payload})
	}
}

function* bettingWorker(action: IAction<any>): any {
	const [response, error] = yield Service.index(action.payload)
	console.log(response, error)
	if (error) {
		yield put({type: bettingError.toString()})
	} else {
			const {data} = response
			const payload = data ?? response
			yield put({type: bettingSuccess.type, payload})
	}
}


function* Watcher() {
	yield takeLatest(index.type, indexWorker)
	yield takeLatest(betting.type, bettingWorker)
}

export default Watcher
