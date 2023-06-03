import { Attachment as AttachmentM } from "./attachment_model.mjs";

export const attachment = {
	create: async (params) => {
		return await AttachmentM.create(params);
	},
};
