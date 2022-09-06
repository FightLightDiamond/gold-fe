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
	},
	home: any,
	away: any
	intervalID: any
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
	},
	home: {},
	away: {},
	intervalID: null
}

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		getMatches: (state: IMatchState, action?: PayloadAction<string>) => {
			state.loading = true
			state.error = null
			clearInterval(state.intervalID)
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
		setTurn(state: IMatchState, action: PayloadAction<any>) {
			state.home = action.payload.home
			state.away = action.payload.away
		},
		setIntervalID(state: IMatchState, action: PayloadAction<any>) {
			state.intervalID = action.payload
		},
		clearInterval(state: IMatchState) {
			clearInterval(state.intervalID)
		},
	},
})

export const {
	getMatches,
	getMatchesError,
	getMatchesSuccess,
	getCurrentMatch,
	getCurrentMatchError,
	getCurrentMatchSuccess,
	setTurn,
	setIntervalID
} = matchSlice.actions

export default matchSlice.reducer
