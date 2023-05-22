import { Customer as CustomerM } from "./customer_model.mjs";
import { logger } from "../../logger.mjs";
import { CustomError } from "../../customError.mjs";

export const Customer = {
	login: async (params) => {
		try {
			const userInfo = CustomerM.findOne({
				where: {
					email: params.email,
					deleted: null,
				},
			});
			logger.info("userInfo", userInfo.toJSON());
			return userInfo.toJSON();
		} catch (error) {
			throw new Error(error);
		}
	},

	signUp: async (params) => {
		try {
			// const signed = (await CustomerM.create(params)) || null;
			console.log("params", JSON.stringify(params));
			return params;
		} catch (error) {
			throw new CustomError("Rosemary", error.message);
		}
	},

	checkUniqueEmail: async (userEmail) => {
		try {
			const count = await CustomerM.findOne({
				where: {
					email: userEmail,
					deleted: null,
				},
			});
			logger.info("count", count.toJSON());
			return count;
		} catch (error) {
			throw new Error(error);
		}
	},
};
