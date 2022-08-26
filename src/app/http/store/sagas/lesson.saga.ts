import {put, takeLeading} from 'redux-saga/effects'
import {
	index,
	indexError,
	indexSuccess,
	find,
	findError,
	findSuccess,
	store,
	storeError,
	storeSuccess,
	update,
	updateError,
	updateSuccess,
	destroy,
	destroyError,
	destroySuccess
} from '../reducers/lesson.slice'
import Service from "../../services/lesson.service";
import {IAction} from "../IAction";

function* indexWorker(action: IAction<any>): any {
	const [response, error] = yield Service.index(action.payload)

	if (error) {
		yield put({type: indexError.toString()})
	} else {
			const {data} = response
			const payload = data ?? response
			yield put({type: indexSuccess.type, payload})
	}
}

function* storeWorker(action: IAction<any>): any {
	const [response, error] = yield Service.store(action.payload)

	if (error) {
		yield put({type: storeError.toString()})
	} else {
			const payload = response
			yield put({type: storeSuccess.type, payload})
	}
}

function* findWorker(action: IAction<number>): any {
	const [response, error] = yield Service.find(action.payload)



	if (error) {

		yield put({type: findError.toString()})
	} else {
			const payload = response
			yield put({type: findSuccess.type, payload})
	}
}

function* updateWorker(action: IAction<any>): any {
	const {id, body} = action.payload
	const [response, error] = yield Service.update(id, body)
	console.log({response})
	if (error) {

		yield put({type: updateError.toString()})
	} else {
			const payload = response
			yield put({type: updateSuccess.type, payload})
	}
}

function* destroyWorker(action: IAction<any>): any {
	const [response, error] = yield Service.delete(action.payload)

	if (error) {

		yield put({type: destroyError.toString()})
	} else {
			const payload = response
			yield put({type: destroySuccess.type, payload})
	}
}

function* Watcher() {
	yield takeLeading(index.type, indexWorker)
	yield takeLeading(find.type, findWorker)
	yield takeLeading(store.type, storeWorker)
	yield takeLeading(update.type, updateWorker)
	yield takeLeading(destroy.type, destroyWorker)
}

export default Watcher
