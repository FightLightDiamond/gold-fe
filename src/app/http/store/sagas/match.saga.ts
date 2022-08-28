import {put, takeLatest} from 'redux-saga/effects'
import {
	index,
	indexError,
	indexSuccess,
	getCurrentMatch,
	getCurrentMatchError,
	getCurrentMatchSuccess
} from '../reducers/match.slice'
import Service from "../../services/match.service";
import {IAction} from "../IAction";

function* indexWorker(action: IAction<any>): any {
	const [response, error] = yield Service.index(action.payload)
	console.log(response, error)
	if (error) {
		yield put({type: indexError.type})
	} else {
			// const {data} = response
			const payload = response
			yield put({type: indexSuccess.type, payload})
	}
}

function* getCurrentMatchWorker(action: IAction<any>): any {
	const [response, error] = yield Service.getCurrentMatch()
	console.log(response, error)
	if (error) {
		yield put({type: getCurrentMatchError.type})
	} else {
			const {data} = response
			const payload = data ?? response
			console.log('getCurrentMatchWorker', payload)
			yield put({type: getCurrentMatchSuccess.type, payload})
	}
}

function* Watcher() {
	yield takeLatest(index.type, indexWorker)
	yield takeLatest(getCurrentMatch.type, getCurrentMatchWorker)
}

export default Watcher
