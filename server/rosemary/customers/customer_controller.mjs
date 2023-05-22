import bcrypt from "bcrypt";

import { Customer as CustomerS } from "./customer_service.mjs";
import { CustomError } from "../../customError.mjs";
import { logger } from "../../logger.mjs";

const saltRounds = 11;

export const customer = {
	signUp: async (params) => {
		try {
			console.log("Sign-up params", JSON.stringify(params));
			let pwdHash;
			if (!params || !params.email || !params.password) {
				throw new CustomError("Rosemary", "Missing required credentials");
			} else {
				const testHash = await bcrypt.hash(params.password, saltRounds, (err, hash) => {
					if (err) {
						throw new CustomError("Rosemary", err);
					} else {
						console.log("hash", hash);
						return hash;
					}
				});

				console.log("testHash", testHash);
				// if (pwdHash) {
				// 	params.password = pwdHash;
				// 	console.log("parsedParams", params);
				// 	await CustomerS.signUp(params);
				// }
			}
		} catch (error) {
			throw new Error(error);
		} finally {
			return params;
		}
	},

	logIn: async (params) => {
		logger.info("Customer logIn() params", params);
		try {
			if (!params || !params.email || !params.password) {
				throw new CustomError("Rosemary", "Missing required credentials");
			}
		} catch (error) {
			throw new Error(error);
		} finally {
			return null;
		}
	},

	checkUniqueEmail: async (email) => {
		logger.info("Customer checkUniqueEmail() email", email);
		try {
			if (!email) {
				throw new CustomError("Rosemary", "Email is required field");
			} else if (typeof email !== "string") {
				throw new CustomError("Rosemary", "Email has to be string");
			}

			const findEmail = await CustomerS.checkUniqueEmail();
			logger.info("findEmail", findEmail);
			return findEmail;
		} catch (error) {
			throw new Error(error);
		}
	},
};
