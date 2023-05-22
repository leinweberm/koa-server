import Router from "koa-router";

import { logger } from "../logger.mjs";
import { customer } from "./customers/customer_controller.mjs";

export const rosemaryRouter = new Router();

rosemaryRouter.get('/api/rosemary/sign-up', async (ctx) => {
	try {
		customer.signUp(ctx.request.body);
	} catch (error) {
		logger.error(error);
	}
});

rosemaryRouter.post('/api/rosemary/login', async (ctx) => {
	try {
		customer.logIn(ctx.request.body);
	} catch (error) {
		logger.error(error);
	}
});
