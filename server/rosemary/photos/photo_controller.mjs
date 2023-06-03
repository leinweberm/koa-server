import { photo as PhotoS } from "./photo_service.mjs";

export const photo = {
	create: async (params) => {
		return await PhotoS.create(params);
	},
};
