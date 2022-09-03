import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IMatchLog} from "../../../interfaces/match-log.interface";

export interface IMatchState {
	items: IMatchLog[],
	item: any,
	loading: boolean
	error: string | null
	currentMatch: {
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
	currentMatch: {
		item: {},
		loading: false,
		error: null
	}
}

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		getMatches: (state: IMatchState, action?: PayloadAction<string>) => {
			state.loading = true
			state.error = null
		},
		getMatchesError: (state: IMatchState, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		getMatchesSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.loading = false
			state.items = action.payload
		},
		getCurrentMatch: (state: IMatchState, action?: PayloadAction<string>) => {
			state.currentMatch.loading = true
			state.currentMatch.error = null
		},
		getCurrentMatchError: (state: IMatchState, action: PayloadAction<string>) => {
			state.currentMatch.loading = false
			state.currentMatch.error = action.payload
		},
		getCurrentMatchSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.currentMatch.loading = false
			state.currentMatch.item = action.payload
		},
	},
})

export const {
	getMatches,
	getMatchesError,
	getMatchesSuccess,
	getCurrentMatch,
	getCurrentMatchError,
	getCurrentMatchSuccess
} = matchSlice.actions

export default matchSlice.reducer
