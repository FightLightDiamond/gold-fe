import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ITask {
	id: number
	title: string
	active: number
	assign: number
}

interface IState {
	items: ITask[],
	item: any,
	loading: boolean
	error: string | null
}

const initialState: IState = {
	items: [],
	item: null,
	loading: false,
	error: null
}

export const slice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		getTasks: (state: IState, action: PayloadAction<any>) => {
			state.loading = true
			state.error = null
		},
		getTasksError: (state: IState, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		getTasksSuccess: (state: IState, action: PayloadAction<ITask[]>) => {
			state.loading = false
			state.items = action.payload
		},
		findTask: (state: IState, action:PayloadAction<number>) => {
			state.loading = true
			state.error = null
		},
		findTaskError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		findTaskSuccess: (state: IState, action) => {
			console.log('findTaskSuccess', action)
			state.loading = false
			state.item = action.payload
		},
		createTask: (state: IState, action) => {
			state.loading = true
			state.error = null
		},
		createTaskError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		createTaskSuccess: (state: IState, action) => {
			state.loading = false
			state.item = action.payload
		},
		updateTask: (state: IState, action) => {
			state.loading = true
			state.error = null
		},
		updateTaskError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		updateTaskSuccess: (state: IState, action) => {
			state.loading = false
			state.item = action.payload
		},
		destroyTask: (state: IState, action) => {
			state.loading = true
			state.error = null
		},
		destroyTaskError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		destroyTaskSuccess: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const {
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
} = slice.actions

export default slice.reducer
