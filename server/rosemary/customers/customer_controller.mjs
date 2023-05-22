import { Customer as CustomerS } from "./customer_service.mjs";

export const customer = {
	signUp: async (params) => {
		try {


		} catch (error) {
			if (!params || !params.username || !params.password) {

			}
		}

		console.log('Customer signUp() params', params);
	},

	logIn: async (params) => {
		console.log('Customer logIn() params', params);
	},
};
