import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import { Customer as CustomerS } from "./customer_service.mjs";
import { CustomError } from "../../customError.mjs";
import { logger } from "../../logger.mjs";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 11;
const bcryptHash = promisify(bcrypt.hash);
const jwtVerify = promisify(jwt.verify);
const jwtSign = promisify(jwt.sign);

export const customer = {
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

				const signUpSuccesful = await CustomerS.signUp(userParams);

				if (signUpSuccesful.status === 201) {
					const token = await jwtSign(
						{
							email: signUpSuccesful.email,
							role: signUpSuccesful.status,
							expiresIn: "24h",
						},
						jwtSecret,
						{ expiresIn: 24 * (60 * 60) }
					);
					console.log("token", token);
					signUpSuccesful.token = token;
					return signUpSuccesful;
				} else {
					return signUpSuccesful;
				}
			} else {
				throw new CustomError("Rosemary", "Hashing new user password failed");
			}
		} catch (error) {
			logger.error(error);
			throw new Error(error);
		}
	},

	logIn: async (params) => {
		try {
			if (!params || !params.email || !params.password) {
				throw new CustomError("Rosemary", "Missing required credentials");
			}
		} catch (error) {
			logger.error(error);
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
			logger.info("findEmail", findEmail);
			return findEmail;
		} catch (error) {
			throw new Error(error);
		}
	},
};
