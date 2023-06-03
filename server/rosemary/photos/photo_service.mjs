import { Photo as PhotoM } from "./photo_model.mjs";

export const photo = {
	create: async (params) => {
		return await PhotoM.findCreateFind(params);
	},
};
