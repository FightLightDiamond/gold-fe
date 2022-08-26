import {put, takeLeading} from 'redux-saga/effects'
import {
	getTasks,
	getTasksError,
	getTasksSuccess,
	findTask,
	findTaskError,
	findTaskSuccess,
	createTask,
	createTaskError,
	createTaskSuccess,
	updateTask,
	updateTaskError,
	updateTaskSuccess,
	destroyTask,
	destroyTaskError,
	destroyTaskSuccess
} from '../reducers/task.slice'
import service from "../../services/task.service";
import {IAction} from "../IAction";

function* indexWorker(action: IAction<any>): any {
	const [response, error] = yield service.index(action.payload)

	if (error) {
		yield put({type: getTasksError.toString()})
	} else {
			const payload = response
			yield put({type: getTasksSuccess.type, payload})
	}
}

function* storeWorker(action: IAction<any>): any {
	const [response, error] = yield service.store(action.payload)

	if (error) {
		yield put({type: createTaskError.toString()})
	} else {
			const payload = response
			yield put({type: createTaskSuccess.type, payload})
	}
}

function* findWorker(action: IAction<number>): any {
	const [response, error] = yield service.find(action.payload)

	if (error) {
		yield put({type: findTaskError.toString()})
	} else {
			const payload = response
			yield put({type: findTaskSuccess.type, payload})
	}
}

function* updateWorker(action: IAction<any>): any {
	const {id, body} = action.payload
	const [response, error] = yield service.update(id, body)

	if (error) {
		yield put({type: updateTaskError.toString()})
	} else {
			const payload = response
			yield put({type: updateTaskSuccess.type, payload})
	}
}



function* destroyWorker(action: IAction<number>): any {
	const [response, error] = yield service.delete(action.payload)

	if (error) {
		yield put({type: destroyTaskError.toString()})
	} else {
			const payload = response
			yield put({type: destroyTaskSuccess.type, payload})
	}
}

function* taskWatcher() {
	yield takeLeading(getTasks.toString(), indexWorker)
	yield takeLeading(findTask.type, findWorker)
	yield takeLeading(createTask.type, storeWorker)
	yield takeLeading(updateTask.type, updateWorker)
	yield takeLeading(destroyTask.type, destroyWorker)
}

export default taskWatcher
