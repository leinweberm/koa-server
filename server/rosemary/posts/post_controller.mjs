import { post as PostS } from "./post_service.mjs";

export const post = {
	find: async (params) => {},

	get: async (params) => {},

	create: async (params) => {
		return await PostS.create(params);
	},

	save: async (params) => {},

	delete: async (params) => {},
};
