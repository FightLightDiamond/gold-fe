import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IMatchLog} from "../../../interfaces/match-log.interface";

export interface IMatchState {
	items: IMatchLog[],
	item: any,
	loading: boolean
	error: string | null
	betting: {
		item: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IMatchState = {
	items: [],
	item: null,
	loading: false,
	error: null,
	betting: {
		item: {},
		loading: false,
		error: null
	}
}

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		index: (state: IMatchState, action?: PayloadAction<string>) => {
			state.loading = true
			state.error = null
		},
		indexError: (state: IMatchState, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		indexSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.loading = false
			state.items = action.payload
		},
		betting: (state: IMatchState, action?: PayloadAction<string>) => {
			state.betting.loading = true
			state.betting.error = null
		},
		bettingError: (state: IMatchState, action: PayloadAction<string>) => {
			state.betting.loading = false
			state.betting.error = action.payload
		},
		bettingSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.betting.loading = false
			state.betting.item = action.payload
		},
	},
})

export const {
	index,
	indexError,
	indexSuccess,
	betting,
	bettingError,
	bettingSuccess
} = matchSlice.actions

export default matchSlice.reducer
