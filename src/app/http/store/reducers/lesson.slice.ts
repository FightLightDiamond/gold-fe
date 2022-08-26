import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	items: any[],
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

interface IUpdatePayload {
	id: number,
	body: {
		title: string
		intro: string
		content: string
	}
}

interface IStorePayload {
	body: {
		title: string
		intro: string
		content: string
	}
}

export const lessonSlice = createSlice({
	name: 'lesson',
	initialState,
	reducers: {
		index: (state: IState, action: PayloadAction<string>) => {
			state.loading = true
			state.error = null
		},
		indexError: (state: IState, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		indexSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.loading = false
			state.items = action.payload
		},
		find: (state: IState, action:PayloadAction<number>) => {
			console.log({action})
			state.loading = true
			state.error = null
		},
		findError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		findSuccess: (state: IState, action) => {
			console.log('findSuccess', action)
			state.loading = false
			state.item = action.payload
		},
		store: (state: IState, action) => {
			state.loading = true
			state.error = null
		},
		storeError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		storeSuccess: (state: IState, action: PayloadAction<IStorePayload>) => {
			state.loading = false
			state.item = action.payload
		},
		update: (state: IState, action: PayloadAction<IUpdatePayload>) => {
			state.loading = true
			state.error = null
		},
		updateError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		updateSuccess: (state: IState, action) => {
			state.loading = false
			state.item = action.payload
		},
		destroy: (state: IState, action) => {
			state.loading = true
			state.error = null
		},
		destroyError: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
		destroySuccess: (state: IState, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const {
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
} = lessonSlice.actions

export default lessonSlice.reducer
