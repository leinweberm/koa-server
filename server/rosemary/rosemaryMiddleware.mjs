import { logger } from "../logger.mjs";
import { customer as CustomerC } from "./customers/customer_controller.mjs";

export const errorHandlingMiddleware = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		const errorMessage = `${error.message}: ${error.stack}`;
		const responseMessage = `${error.message}`;
		logger.error(errorMessage);
		ctx.response.status = 500;
		ctx.response.body = responseMessage;
	}
};

export const jwtTokenMiddleware = async (ctxToken, requiredStatus) => {
	const token = ctxToken;
	if (!token) {
		return false;
	} else {
		const result = await CustomerC.verifyToken(token);
		return result.status === requiredStatus && result.exp > 0;
	}
};
