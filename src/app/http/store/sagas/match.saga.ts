import {put, takeLatest} from 'redux-saga/effects'
import {
	getMatches,
	getMatchesError,
	getMatchesSuccess,
	getCurrentMatch,
	getCurrentMatchError,
	getCurrentMatchSuccess
} from '../reducers/match.slice'
import Service from "../../services/match.service";
import {IAction} from "../IAction";

function* indexWorker(action: IAction<any>): any {
	const [response, error] = yield Service.index(action.payload)

	if (error) {
		yield put({type: getMatchesError.type})
	} else {
			// const {data} = response
			const payload = response
			yield put({type: getMatchesSuccess.type, payload})
	}
}

function* getCurrentMatchWorker(action: IAction<any>): any {
	const [response, error] = yield Service.getCurrentMatch()

	if (error) {
		yield put({type: getCurrentMatchError.type})
	} else {
			const {data} = response
			const payload = data ?? response
			yield put({type: getCurrentMatchSuccess.type, payload})
	}
}

function* Watcher() {
	yield takeLatest(getMatches.type, indexWorker)
	yield takeLatest(getCurrentMatch.type, getCurrentMatchWorker)
}

export default Watcher
