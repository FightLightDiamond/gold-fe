import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from "js-cookie";
import {WS} from "../../ws";

interface IState {
	loading: boolean,
	signInError: boolean,
	user: any,
	token: string,
	balance: number,
	isAuthentication: boolean
	signUpped: boolean
}

const initialState: IState = {
	loading: false,
	signInError: false,
	user: Cookies.get('user') ? JSON.parse(<string>Cookies.get('user')) : null,
	token: Cookies.get('token') ?? '',
	balance: Cookies.get('balance') ? Number(Cookies.get('balance')) : 0,
	isAuthentication: !!Cookies.get('token'),
	signUpped: false
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

			void WS.reconnectSocket(token)
		},
		signInFail: (state: IState) => {
			state.loading = false
			state.isAuthentication = false
			state.signInError = true
		},
		signUp: (state: IState, action: PayloadAction<{
			email: string, password: string, confirmationPassword: string
		}>) => {
			state.loading = true
		},
		signUpSuccess: (state: IState, action: PayloadAction<ISignInSuccessData>) => {
			state.loading = false
			state.signUpped = true
		},
		signUpFail: (state: IState) => {
			state.loading = false
		},
		profile: (state: IState) => {
			state.loading = true
			state.signInError = false
		},
		profileSuccess: (state: IState, action: PayloadAction<any>) => {
			const user = action.payload

			Cookies.set('user', JSON.stringify(user))
			Cookies.set('balance', user.balance)

			state.isAuthentication = true
			state.balance = user.balance
			state.user = user
			state.loading = false
		},
		profileFail: (state: IState) => {
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
		},
		updateBalance: (state: IState, action: PayloadAction<number>) => {
			state.balance = Number(state.balance) + Number(action.payload)
			Cookies.set('balance', state.balance.toString())
			Cookies.set('user', JSON.stringify({
				...state.user,
				balance: state.balance
			}))
		},
	},
})

export const {
	signIn,
	signInSuccess,
	signInFail,
	signUp,
	signUpFail,
	signUpSuccess,
	profile,
	profileSuccess,
	profileFail,
	logout,
	updateBalance
} = authSlice.actions

export default authSlice.reducer
