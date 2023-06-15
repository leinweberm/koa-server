import dotenv from "dotenv";
import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import path from "node:path";
import { fileURLToPath } from "url";

import { logger } from "./server/logger.mjs";
import { mainRouter } from "./server/routers/mainRouter.mjs";
import { uploadRouter } from "./server/routers/uploadRouter.mjs";
import { rosemaryRouter } from "./server/rosemary/rosemaryRouter.mjs";
import { rateLimitMiddleware } from "./server/rateLimiter.mjs";
import { initSequelize } from "./server/pgdb.mjs";

dotenv.config();
const app = new Koa();

// cockroach DB connection
let cockroachOnline = false;
try {
	await initSequelize(process.env.CR_CONNECTION);
	cockroachOnline = true;
} catch (error) {
	logger.error(error);
}

// body parser
const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentDirectoryPath = path.dirname(currentModulePath) + "/server/files";

app.use(
	koaBody({
		multipart: true,
		formidable: {
			maxFileSize: 200 * 1024 * 1024,
			uploadDir: currentDirectoryPath,
			onFileBegin: (name, file) => {
				console.log(`File ${name} uploading:`, file.name);
			},
		},
		onError: (error, ctx) => {
			console.log("Error:", error);
			ctx.throw(400, "Bad Request");
		},
	})
);

// cross origin access
app.use(
	cors({
		origin: "*",
		methods: ["GET", "PUT", "POST"],
		headers: ["Authorization"],
		exposeHeaders: ["Content-Length"],
		maxAge: 1800,
		credentials: true,
	})
);

// rate limiter
app.use(rateLimitMiddleware);

// logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get("X-Response-Time");
	logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set("X-Response-Time", `${ms}ms`);
});

// App routers
app.use(mainRouter.routes());
app.use(uploadRouter.routes());
app.use(rosemaryRouter.routes());

app.on("error", (err, ctx) => {
	logger.error("Server error", err, ctx);
});

if (cockroachOnline) {
	app.listen(process.env.PORT, () => {
		logger.info(`Server started. Server is listening on port ${process.env.PORT}`);
	});
} else {
	logger.error("Starting server failed. Required connections were not established");
}
