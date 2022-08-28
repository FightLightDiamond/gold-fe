import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	bet: {
		item: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IState = {
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
		placeBetError: (state: IState, action: PayloadAction<string>) => {
			state.bet.loading = false
			state.bet.error = action.payload
		},
		placeBetSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.bet.loading = false
			state.bet.item = action.payload
		},
	},
})

export const {
	placeBet,
	placeBetError,
	placeBetSuccess
} = betSlice.actions

export default betSlice.reducer
