import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from "js-cookie";

interface IState {
	loading: boolean,
	signInError: boolean,
	user: any,
	accessToken: string,
	isAuthentication: boolean
}

const initialState: IState = {
	loading: false,
	signInError: false,
	user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') + '') : null,
	accessToken: Cookies.get('accessToken') ?? '',
	isAuthentication: !!Cookies.get('accessToken'),
}

interface ISignInSuccessData {
	token: string,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signIn: (state: IState, action: PayloadAction<{
			email: string, password: string
		}>) => {
			state.loading = true
			state.signInError = false
		},
		signInSuccess: (state: IState, action: PayloadAction<ISignInSuccessData>) => {
			Cookies.set('accessToken', action.payload.token)
			state.isAuthentication = true
			state.loading = false
		},
		signInFail: (state: IState) => {
			state.loading = false
			state.isAuthentication = false
			state.signInError = true
		},
	},
})

export const {
	signIn,
	signInSuccess,
	signInFail,
} = authSlice.actions

export default authSlice.reducer
