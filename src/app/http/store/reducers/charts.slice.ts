import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	gold: {
		items: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IState = {
	gold: {
		items: {},
		loading: false,
		error: null
	}
}

export const chartsSlice = createSlice({
	name: 'charts',
	initialState,
	reducers: {
		getGoldCharts: (state) => {
			state.gold.loading = true
			state.gold.error = null
		},
		getGoldChartsError: (state: IState, action: PayloadAction<string>) => {
			state.gold.loading = false
			state.gold.error = action.payload
		},
		getGoldChartsSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.gold.loading = false
			state.gold.items = action.payload
		},
	},
})

export const {
	getGoldCharts,
	getGoldChartsError,
	getGoldChartsSuccess
} = chartsSlice.actions

export default chartsSlice.reducer
