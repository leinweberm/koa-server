import { Order as OrderM } from "./order_model.mjs";

export const order = {
	create: async (params) => {
		return await OrderM.findCreateFind(params);
	},
};
