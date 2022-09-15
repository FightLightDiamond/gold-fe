import Request from "./request";

interface IAuthData {
	"email": string,
	"password": string,
}

interface ISignInData extends IAuthData {
}

interface ISignUpData extends IAuthData {
	confirmation_password: string
}

interface IChangePassword {
	oldPassword: string,
	newPassword: string,
	reNewPassword: string
}

const authService = {
	signIn: async (credentials: ISignInData) => {
		try {
			const response = await Request.post(
				`auth/sign-in`,
				credentials
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	signUp: async (credentials: ISignUpData) => {
		try {
			const response = await Request.post(
				`auth/sign-up`,
				credentials
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	changePassword: async (changePasswordData: IChangePassword) => {
		try {
			const response = await Request.post(
				`auth/change-password`,
				changePasswordData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
	profile: async (changePasswordData: IChangePassword) => {
		try {
			const response = await Request.get(
				`auth/profile`,
				changePasswordData
			);
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
	},
};

export default authService;
