import { painting as PaintingS } from "./painting_service.mjs";

export const painting = {
	getColumnsDefinition: () => {
		const columns = PaintingS.prepareParams();
		if (columns) {
			return {
				status: 200,
				message: "success - column names fetched",
				data: columns,
			};
		} else {
			return {
				status: 404,
				message: "error - column names not found",
				data: null,
			};
		}
	},

	find: async (params) => {
		try {
			if (!params?.data) {
				return {
					status: 400,
					message: "error - missing parameters. need format: {data:{},filter:{}}",
					data: null,
				};
			}
			const result = await PaintingS.find(params.data, params.filter);
			return result;
		} catch (error) {
			throw new Error(error);
		}
	},

	create: async (params) => {},

	update: async (params) => {},

	delete: async (params) => {
		try {
			if (params.painting_uuid) {
				const result = await PaintingS.delete(params.painting_uuid);
				return result;
			} else {
				return {
					status: "",
					message: "error - missing parameters",
					data: null,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},
};
