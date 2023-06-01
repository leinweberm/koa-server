import { Customer as CustomerM } from "./customer_model.mjs";
import { sequelize } from "../../pgdb.mjs";

export const customer = {
	login: async (email) => {
		try {
			const userInfo = await CustomerM.findOne({
				where: {
					email: email,
					deleted: null,
				},
			});
			return userInfo.toJSON();
		} catch (error) {
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
			if (validEmail[0] && validEmail[0][0] && validEmail[0][0].count === "0") {
				const signed = await CustomerM.create(params);
				if (signed) {
					return {
						status: 201,
						message: "success - new user created",
						data: signed,
					};
				}
			} else {
				return {
					status: 406,
					message: "error - email already taken",
					data: null,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},
};
