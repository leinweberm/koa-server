import { Post as PostM } from "./post_model.mjs";
import { Op } from "sequelize";

export const post = {
	prepareQueryParams: (params) => {
		const newParams = {};
		if (params) {
			for (const [key, value] of Object.entries(params)) {
				if (key === "offset" || key === "limit") {
					newParams[key] = value;
				} else if (key === "order") {
					newParams[key] = [...value];
				} else {
					if (!newParams.where) {
						newParams.where = {
							[Op.and]: [],
						};
					}
					newParams.where[Op.and].push({ [key]: value });
				}
			}
			newParams.where[Op.and].push({ deleted: null });
		}
	},

	find: async (params) => {
		console.log("service find params", params);
		try {
			const findParams = post.prepareQueryParams(params);
			const result = PostM.findAndCountAll(findParams);
			console.log("find query result", result.toJSON());
			return {
				status: 200,
				message: "success - blog post fetched",
				data: result.toJSON(),
			};
		} catch (error) {
			throw new Error(error);
		}
	},

	get: async (params) => {},

	create: async (params) => {
		try {
			console.log("params", params);
			return {
				status: 200,
				message: "success",
				data: { status: "ok" },
			};
		} catch (error) {
			throw new Error(error);
		}
	},

	save: async (params) => {
		try {
		} catch (error) {
			throw new Error(error);
		}
	},

	delete: async (params) => {
		try {
		} catch (error) {
			throw new Error(error);
		}
	},
};
