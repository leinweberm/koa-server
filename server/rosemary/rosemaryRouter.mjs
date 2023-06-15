import Router from "koa-router";

import { errorHandlingMiddleware, jwtTokenMiddleware } from "./rosemaryMiddleware.mjs";
import { attachment as AttachmentC } from "./attachments/attachment_controller.mjs";
import { customer as CustomerC } from "./customers/customer_controller.mjs";
import { order as OrderC } from "./orders/order_controller.mjs";
import { painting as PaintingC } from "./paintings/painting_controller.mjs";
import { photo as PhotoC } from "./photos/photo_controller.mjs";
import { post as PostC } from "./posts/post_controller.mjs";
import { tattoo as TattooC } from "./tattoo/tattoo_controller.mjs";

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

// BLOG POSTS ROUTES
rosemaryRouter.get("/api/rosematy/get-blog-posts", async (ctx, next) => {
	const result = await PostC.find(ctx.request.query);
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});

rosemaryRouter.post("/api/rosemary/create-post", async (ctx, next) => {
	console.log("CTX", ctx.request.body);
	const verification = await jwtTokenMiddleware(ctx.request.body.fields.token, "admin");
	if (!verification) {
		ctx.response.status = 401;
		ctx.response.body = {
			status: "Error - Unathorized access",
			data: null,
		};
	} else {
		ctx.response.status = 200;
		ctx.response.body = {
			status: "success",
			data: { status: "ok" },
		};
	}
	await next();
});

// PAINTING ROUTES
rosemaryRouter.get("/api/rosemary/painting-columns", async (ctx, next) => {
	const result = PaintingC.getColumnsDefinition();
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});

// PHOTOS ROUTES
rosemaryRouter.get("/api/rosemary/create-photo", async (ctx, next) => {
	const result = PhotoC.getColumnsDefinition();
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});

// TATTOO ROUTES
rosemaryRouter.get("/api/rosemary/create-tattoo", async (ctx, next) => {
	const result = TattooC.getColumnsDefinition();
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});

// ORDERS ROUTES
rosemaryRouter.get("/api/rosemary/create-order", async (ctx, next) => {
	const result = OrderC.getColumnsDefinition();
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});

// ATTACHMENTS ROUTES
rosemaryRouter.get("/api/rosemary/create-attachment", async (ctx, next) => {
	const result = AttachmentC.getColumnsDefinition();
	ctx.response.status = result.status;
	ctx.response.body = {
		status: result.message,
		data: result.data,
	};
	await next();
});
