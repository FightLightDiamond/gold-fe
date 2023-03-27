import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	heroes: {
		items: any,
		loading: boolean
		error: string | null
	}
}

const initialState: IState = {
	heroes: {
		items: {},
		loading: false,
		error: null
	}
}

export const heroSlice = createSlice({
	name: 'hero',
	initialState,
	reducers: {
		getHeroes: (state: IState, action?: PayloadAction<string>) => {
			state.heroes.loading = true
			state.heroes.error = null
		},
		getHeroesError: (state: IState, action: PayloadAction<string>) => {
			state.heroes.loading = false
			state.heroes.error = action.payload
		},
		getHeroesSuccess: (state: IState, action: PayloadAction<any[]>) => {
			state.heroes.loading = false
			state.heroes.items = action.payload
		},
	},
})

export const {
	getHeroes,
	getHeroesError,
	getHeroesSuccess
} = heroSlice.actions

export default heroSlice.reducer
