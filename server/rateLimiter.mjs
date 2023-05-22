import rateLimit from 'koa-ratelimit';

const requests = new Map();

export const rateLimitMiddleware = rateLimit({
	driver: 'memory',
	db: requests,
	duration: 120000,
	errorMessage: 'RateLimiter: Too Many Requests, please try again later',
	id: (ctx) => ctx.ip,
	headers: {
		remaining: 'Rate-Limit-Remaining',
		reset: 'Rate-Limit-Reset',
		total: 'Rate-Limit-Total',
	},
	max: 50,
});