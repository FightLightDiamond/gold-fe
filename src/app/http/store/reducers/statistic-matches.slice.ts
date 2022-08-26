import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	statisticMatches: {
		items: any,
		loading: boolean
		error: string | null
	},
	statisticMatchesByHero: {
		items: any,
		loading: boolean
		error: string | null
	},
}

const initialState: IState = {
	statisticMatches: {
		items: [],
		loading: false,
		error: null
	},
	statisticMatchesByHero: {
		items: [],
		loading: false,
		error: null
	}
}

export const statisticMatchesSlice = createSlice({
	name: 'statistic-matches',
	initialState,
	reducers: {
		getStatisticMatches: (state, action?: PayloadAction<string>) => {
			state.statisticMatches.loading = true
			state.statisticMatches.error = null
		},
		getStatisticMatchesError: (state: IState, action: PayloadAction<string>) => {
			state.statisticMatches.loading = false
			state.statisticMatches.error = action.payload
		},
		getStatisticMatchesSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.statisticMatches.loading = false
			state.statisticMatches.items = action.payload
		},
		getStatisticMatchesByHero: (state, action?: PayloadAction<string>) => {
			state.statisticMatchesByHero.loading = true
			state.statisticMatchesByHero.error = null
		},
		getStatisticMatchesByHeroError: (state: IState, action: PayloadAction<string>) => {
			state.statisticMatchesByHero.loading = false
			state.statisticMatchesByHero.error = action.payload
		},
		getStatisticMatchesByHeroSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.statisticMatchesByHero.loading = false
			state.statisticMatchesByHero.items = action.payload
		},
	},
})

export const {
	getStatisticMatches,
	getStatisticMatchesError,
	getStatisticMatchesSuccess,
	getStatisticMatchesByHero,
	getStatisticMatchesByHeroError,
	getStatisticMatchesByHeroSuccess
} = statisticMatchesSlice.actions

export default statisticMatchesSlice.reducer
