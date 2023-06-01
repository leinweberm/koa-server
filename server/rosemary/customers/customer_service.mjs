import { Customer as CustomerM } from "./customer_model.mjs";
import { logger } from "../../logger.mjs";
import { CustomError } from "../../customError.mjs";
import { sequelize } from "../../pgdb.mjs";

export const Customer = {
	login: async (params) => {
		try {
			const userInfo = CustomerM.findOne({
				where: {
					email: params.email,
					deleted: null,
				},
			});
			return userInfo.toJSON();
		} catch (error) {
			logger.error(error);
			throw new Error(error);
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
			return count;
		} catch (error) {
			logger.error(error);
			throw new Error(error);
		}
	},

	signUp: async (params) => {
		try {
			const validEmail = await sequelize.query(`
				SELECT COUNT(*)
				FROM rosemary.customers
				WHERE deleted IS NULL
				AND email = '${params.email}'
			`);
			console.log("validEmail", validEmail);
			if (validEmail[0] && validEmail[0][0] && validEmail[0][0] != 0) {
				return {
					status: 406,
					message: "error - email already taken",
					data: null,
				};
			} else {
				const signed = await CustomerM.create(params);
				if (signed) {
					return {
						status: 201,
						message: "success - new user created",
						data: signed,
					};
				}
			}
		} catch (error) {
			logger.error(error);
			throw new CustomError("Rosemary", error.message);
		}
	},
};
