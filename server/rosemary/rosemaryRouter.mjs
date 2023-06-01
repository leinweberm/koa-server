import Router from "koa-router";

import { logger } from "../logger.mjs";
import { customer as CustomerC } from "./customers/customer_controller.mjs";

export const rosemaryRouter = new Router();

rosemaryRouter.get("/api/rosemary/test", async (ctx) => {
	ctx.body = "Toto je testovaci Rosemary API";
});

rosemaryRouter.post("/api/rosemary/sign-up", async (ctx, next) => {
	try {
		const result = await CustomerC.signUp(ctx.request.body);
		ctx.response.status = result.status;
		ctx.response.body = {
			status: result.message,
			data: result.data,
			token: result.token,
		};
	} catch (error) {
		const errorMessage = `${error.name}: ${error.message}: ${error.stack}`;
		logger.error(errorMessage);
		ctx.response.status = 500;
		ctx.response.body = errorMessage;
	}
	await next();
});

rosemaryRouter.post("/api/rosemary/login", async (ctx, next) => {
	try {
		console.log("router params", ctx.request.body);
		const result = await CustomerC.logIn(ctx.request.body);
		console.log("result", result);
		ctx.response.status = result.status;
		ctx.response.body = {
			status: result.message,
			data: result.data,
			token: result.token,
		};
	} catch (error) {
		const errorMessage = `${error.name}: ${error.message}: ${error.stack}`;
		logger.error(errorMessage);
		ctx.response.status = 500;
		ctx.response.body = errorMessage;
	}
	await next();
});
