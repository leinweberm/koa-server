import { Tattoo as TattooM } from "./tattoo_model.mjs";

export const tattoo = {
	create: async (params) => {
		return await TattooM.findCreateFind(params);
	},
};
