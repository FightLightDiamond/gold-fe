import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	charts: {
		items: any,
		loading: boolean
		error: string | null
	}
	hero: {
		items: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IState = {
	charts: {
		items: {},
		loading: false,
		error: null
	},
	hero: {
		items: {},
		loading: false,
		error: null
	},
}

export const heroSlice = createSlice({
	name: 'hero',
	initialState,
	reducers: {
		getMyHero: (state, action?: PayloadAction<string>) => {
			state.charts.loading = true
			state.charts.error = null
		},
		getMyHeroError: (state: IState, action: PayloadAction<string>) => {
			state.charts.loading = false
			state.charts.error = action.payload
		},
		getMyHeroSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.charts.loading = false
			state.charts.items = action.payload
		},
		getCharts: (state, action?: PayloadAction<string>) => {
			state.charts.loading = true
			state.charts.error = null
		},
		getChartsError: (state: IState, action: PayloadAction<string>) => {
			state.charts.loading = false
			state.charts.error = action.payload
		},
		getChartsSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.charts.loading = false
			state.charts.items = action.payload
		},
		selectHero: (state, action?: PayloadAction<string>) => {
			state.hero.loading = true
			state.hero.error = null
		},
		selectHeroError: (state: IState, action: PayloadAction<string>) => {
			state.hero.loading = false
			state.hero.error = action.payload
		},
		selectHeroSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.hero.loading = false
			state.hero.items = action.payload
		},
		upPointHero: (state, action?: PayloadAction<string>) => {
			state.hero.loading = true
			state.hero.error = null
		},
		upPointHeroError: (state: IState, action: PayloadAction<string>) => {
			state.hero.loading = false
			state.hero.error = action.payload
		},
		upPointHeroSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.hero.loading = false
			// state.hero.items = action.payload
		},
		upLevelHero: (state, action?: PayloadAction<string>) => {
			state.hero.loading = true
			state.hero.error = null
		},
		upLevelHeroError: (state: IState, action: PayloadAction<string>) => {
			state.hero.loading = false
			state.hero.error = action.payload
		},
		upLevelHeroSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.hero.loading = false
			// state.hero.items = action.payload
		},
	},
})

export const {
	getCharts,
	getChartsError,
	getChartsSuccess,
	getMyHero,
	getMyHeroError,
	getMyHeroSuccess,
	selectHero,
	selectHeroError,
	selectHeroSuccess,
	upPointHero,
	upPointHeroError,
	upPointHeroSuccess,
	upLevelHero,
	upLevelHeroError,
	upLevelHeroSuccess,
} = heroSlice.actions

export default heroSlice.reducer
