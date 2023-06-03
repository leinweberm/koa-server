import { order as OrderC } from "./order_service.mjs";

export const order = {
	create: async (params) => {
		return await OrderC.create(params);
	},
};
