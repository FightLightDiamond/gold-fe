import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IMatchState {
	loading: boolean
	error: string | null
}

const initialState: IMatchState = {
	loading: false,
	error: null,
}

export const matchSlice = createSlice({
	name: 'elo-match',
	initialState,
	reducers: {
		fightEloMatch: (state: IMatchState, action?: PayloadAction<string>) => {
			state.loading = true
			state.error = null
		},
		fightEloMatchError: (state: IMatchState, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		fightEloMatchSuccess: (state: IMatchState, action: PayloadAction<any[]>) => {
			state.loading = false
		}
	},
})

export const {
	fightEloMatch,
	fightEloMatchError,
	fightEloMatchSuccess,
} = matchSlice.actions

export default matchSlice.reducer
