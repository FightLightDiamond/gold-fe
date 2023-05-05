import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IBetState {
	bet: {
		item: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IBetState = {
	bet: {
		item: {},
		loading: false,
		error: null
	}
}

export const betSlice = createSlice({
	name: 'bet',
	initialState,
	reducers: {
		placeBet: (state, action?: PayloadAction<string>) => {
			state.bet.loading = true
			state.bet.error = null
		},
		placeBetError: (state: IBetState, action: PayloadAction<string>) => {
			state.bet.loading = false
			state.bet.error = action.payload
		},
		placeBetSuccess: (state: IBetState, action: PayloadAction<any[]>) => {
			state.bet.loading = false
			state.bet.item = action.payload
		},
		currentBet: (state, action?: PayloadAction<string>) => {
			state.bet.loading = true
			state.bet.error = null
		},
		currentBetError: (state: IBetState, action: PayloadAction<string>) => {
			state.bet.loading = false
			state.bet.error = action.payload
		},
		currentBetSuccess: (state: IBetState, action: PayloadAction<any[]>) => {
			state.bet.loading = false
			state.bet.item = action.payload
		},
	},
})

export const {
	placeBet,
	placeBetError,
	placeBetSuccess,
	currentBet,
	currentBetError,
	currentBetSuccess,
} = betSlice.actions

export default betSlice.reducer
