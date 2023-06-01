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

export const jwtTokenMiddleware = async (ctx, next) => {
	const queryToken = ctx.request.query.token;
	const paramsToken = ctx.request.params.token;
	const token = queryToken || paramsToken;

	if (!token) {
		ctx.response.status = 401;
		ctx.response.body = {
			status: "error - unauthenticated user",
			data: null,
			token: null,
		};
		return;
	} else {
		await CustomerC.verifyToken(token);
	}

	await next();
};
