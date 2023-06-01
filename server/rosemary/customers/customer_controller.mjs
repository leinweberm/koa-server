import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import { customer as CustomerS } from "./customer_service.mjs";
import { CustomError } from "../../customError.mjs";
import { logger } from "../../logger.mjs";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 11;
const bcryptHash = promisify(bcrypt.hash);
const bcryptCompare = promisify(bcrypt.compare);
const jwtVerify = promisify(jwt.verify);
const jwtSign = promisify(jwt.sign);

export const customer = {
	getJwtToken: async (params) => {
		try {
			const token = await jwtSign(
				{
					email: params.email,
					role: params.status,
					expiresIn: "24h",
				},
				jwtSecret,
				{ expiresIn: 24 * (60 * 60) }
			);
			return token;
		} catch (error) {
			throw new Error(error);
		}
	},

	deleteSecretKeys: (params) => {
		const newParams = { ...params };
		newParams.password && delete newParams.password;
		newParams.address && delete newParams.address;
		newParams.phone && delete newParams.phone;
		newParams.customer_uid && delete newParams.customer_uid;
		newParams.spendings && delete newParams.spendings;
		newParams.name && delete newParams.name;
		return newParams;
	},

	signUp: async (params) => {
		try {
			if (!params || !params.email || !params.password) {
				throw new CustomError("Rosemary", "Missing required credentials");
			}

			let hashedPassword = await bcryptHash(params.password, saltRounds);
			if (hashedPassword) {
				const userParams = params;
				userParams.password = hashedPassword;
				userParams.status = "regular";

				const userData = await CustomerS.signUp(userParams);

				if (userData.status === 201) {
					userData.data = customer.deleteSecretKeys(userData.data);
					userData.token = await customer.getJwtToken(userData);
					return userData;
				} else {
					return userData;
				}
			} else {
				throw new CustomError("Rosemary", "Hashing new user password failed");
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	logIn: async (params) => {
		try {
			if (!params || !params.email || !params.password) {
				throw new CustomError("Rosemary", "Missing required credentials");
			}

			const { password } = await CustomerS.login(params.email);

			if (!password) {
				logger.error("Password for user not found");
				return {
					status: 406,
					message: "error - user not found",
					data: params.email,
					token: null,
				};
			} else {
				const verified = await bcryptCompare(params.password, password);
				const token = verified ? await customer.getJwtToken({ email: params.email, status: 200 }) : null;
				return {
					status: verified ? 200 : 401,
					message: verified ? "success" : "error",
					data: params.email,
					token: verified ? token : null,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	verifyToken: async (token) => {
		try {
			return await jwtVerify(token, jwtSecret);
		} catch (error) {
			throw new Error(error);
		}
	},

	checkUniqueEmail: async (email) => {
		try {
			if (!email) {
				throw new CustomError("Rosemary", "Email is required field");
			} else if (typeof email !== "string") {
				throw new CustomError("Rosemary", "Email has to be string");
			}

			const findEmail = await CustomerS.checkUniqueEmail();
			return findEmail;
		} catch (error) {
			throw new Error(error);
		}
	},
};
