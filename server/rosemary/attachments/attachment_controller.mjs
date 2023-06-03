import { attachment as AttachmentS } from "./attachment_service.mjs";

export const attachment = {
	create: async (params) => {
		return await AttachmentS.create(params);
	},
};
