import { tattoo as TattooS } from "./tattoo_service.mjs";

export const tattoo = {
	create: async (params) => {
		return await TattooS.create(params);
	},
};
