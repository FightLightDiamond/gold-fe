import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IMatchState {
	loading: boolean
	error: string | null,
	fight: {
		match: any,
		loading: boolean
		error: string | null
	}
	histories: {
		items: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IMatchState = {
	loading: false,
	error: null,
	fight: {
		match: null,
		loading: false,
		error: null
	},
	histories: {
		items: null,
		loading: false,
		error: null
	}
}

export const matchSlice = createSlice({
	name: 'elo-match',
	initialState,
	reducers: {
		fightEloMatch: (state: IMatchState, action?: PayloadAction<string>) => {
			state.fight.loading = true
			state.fight.error = null
		},
		fightEloMatchError: (state: IMatchState, action: PayloadAction<string>) => {
			state.loading = false
			state.fight.error = action.payload
		},
		fightEloMatchSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.fight.match = action.payload
			state.fight.loading = false
		},
		historiesEloMatch: (state: IMatchState, action?: PayloadAction<string>) => {
			state.histories.loading = true
			state.histories.error = null
		},
		historiesEloMatchError: (state: IMatchState, action: PayloadAction<string>) => {
			state.histories.loading = false
			state.histories.error = action.payload
		},
		historiesEloMatchSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.histories.loading = false
			state.histories.items = action.payload
		},
	},
})

export const {
	fightEloMatch,
	fightEloMatchError,
	fightEloMatchSuccess,
	historiesEloMatch,
	historiesEloMatchError,
	historiesEloMatchSuccess
} = matchSlice.actions

export default matchSlice.reducer
