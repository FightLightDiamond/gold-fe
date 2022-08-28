import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from "js-cookie";

interface IState {
	loading: boolean,
	signInError: boolean,
	user: any,
	token: string,
	balance: number,
	isAuthentication: boolean
}

const initialState: IState = {
	loading: false,
	signInError: false,
	user: Cookies.get('user') ? JSON.parse(<string>Cookies.get('user')) : null,
	token: Cookies.get('token') ?? '',
	balance: Cookies.get('balance') ? parseInt(<string>Cookies.get('balance')) : 0,
	isAuthentication: !!Cookies.get('token'),
}

interface ISignInSuccessData {
	token: string,
	user: any,
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
			const { token, user } = action.payload

			Cookies.set('token', token)
			Cookies.set('user', JSON.stringify(user))
			Cookies.set('balance', user.balance)

			state.isAuthentication = true
			state.token = token
			state.balance = user.balance
			state.user = user
			state.loading = false
		},
		signInFail: (state: IState) => {
			state.loading = false
			state.isAuthentication = false
			state.signInError = true
		},
		logout: (state: IState) => {
			Cookies.remove('token')
			Cookies.remove('user')

			state.isAuthentication = false
			state.token = ''
			state.balance = 0
			state.user = null
		}
	},
})

export const {
	signIn,
	signInSuccess,
	signInFail,
	logout
} = authSlice.actions

export default authSlice.reducer
