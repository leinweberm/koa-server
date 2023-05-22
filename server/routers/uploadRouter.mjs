import Router from "koa-router";
import bodyParser from 'koa-bodyparser';

export const uploadRouter = new Router();

// body parser
uploadRouter.use(bodyParser({
	onerror: (err, ctx) => {
		ctx.throw(422, 'Server body parser error');
		logger.error(err);
	},
}));
uploadRouter.use(async ctx => {
	ctx.body = ctx.request.body;
});

uploadRouter.post('/api/upload/file', async (ctx) => {

});