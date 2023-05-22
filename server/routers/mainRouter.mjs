import Router from "koa-router";

export const mainRouter = new Router();

mainRouter.get('/api/test', async (ctx) => {
	ctx.body = 'toto je testovaci route';
});

mainRouter.post('/api/login', async (ctx) => {
	
});
