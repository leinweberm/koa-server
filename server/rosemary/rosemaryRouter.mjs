import Router from "koa-router";

import { errorHandlingMiddleware, jwtTokenMiddleware } from "./rosemaryMiddleware.mjs";
import { customer as CustomerC } from "./customers/customer_controller.mjs";
import { post as PostC } from "./posts/post_controller.mjs";

export const rosemaryRouter = new Router();

rosemaryRouter.use(errorHandlingMiddleware);

// USER ROUTES
rosemaryRouter.post("/api/rosemary/sign-up", async (ctx, next) => {
	const result = await CustomerC.signUp(ctx.request.body);
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
		token: result.token,
	};
	await next();
});

rosemaryRouter.post("/api/rosemary/login", async (ctx, next) => {
	const result = await CustomerC.logIn(ctx.request.body);
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
		token: result.token,
	};
	await next();
});

rosemaryRouter.get("/api/rosemary/test-middleware", jwtTokenMiddleware, (ctx, next) => {
	ctx.response.status = 200;
	ctx.response.body = "Toto je testovaci middleware result";
});

// BLOG POSTS ROUTES
rosemaryRouter.get("/api/rosematy/get-blog-posts", async (ctx, next) => {
	console.log("request query", ctx.request.query);
	const result = await PostC.find(ctx.request.query);
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});
