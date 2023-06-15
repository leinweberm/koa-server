import { sequelize } from "../../pgdb.mjs";

import { Painting as PaintingM } from "./painting_model.mjs";

export const painting = {
	prepareParams: (params) => {
		const newParams = {};
		const columnNames = Object.keys(PaintingM.rawAttributes);
		for (const [key, value] of Object.entries(params)) {
			if (columnNames.includes(key)) {
				if (key === "data" || key === "painting_title" || key === "painting_description") {
					newParams = JSON.stringify(value);
				} else {
					newParams[key] = value;
				}
			}
		}
		return newParams;
	},

	prepareWhereStatement: (filter) => {
		const filterStatement = {};
		const columnNames = Object.keys(PaintingM.rawAttributes);
		if (filter?.where) {
			for (const [key, value] of Object.entries(filter.where)) {
				if (columnNames.includes(key)) {
					filterStatement[key] = value;
				}
			}
		}
		if (filter?.offset) {
			filterStatement.offset = filter.offset;
		}
		if (filter?.limit) {
			filterStatement;
		}
	},

	find: async (data, filter) => {
		try {
			const [rows, count] = await PaintingM.findAndCountAll();
		} catch (error) {
			throw new Error(error);
		}
	},

	create: async (params) => {
		try {
			const parsedParams = painting.prepareParams(params);
			const queryParams = {
				where: { painting_uuid: parsedParams.painting_uuid },
				defaults: { ...parsedParams },
			};
			const [user, created] = await PaintingM.findCreateFind(queryParams);
			return {
				status: created ? 201 : 409,
				message: created ? "success" : "error",
				data: created ? user : null,
			};
		} catch (error) {
			throw new Error(error);
		}
	},

	update: async (params) => {
		try {
			const parsedParams = painting.prepareParams(params);
			const queryParams = {
				where: { painting_uuid: parsedParams.painting_uuid },
				defaults: { ...parsedParams },
			};
			const [count, rows] = await PaintingM.update(queryParams);
			return { status: "ok" };
		} catch (error) {
			throw new Error(error);
		}
	},

	delete: async (paintingUid) => {
		try {
			const [instance, created] = await PaintingM.upsert({
				painting_uuid: paintingUid,
				deleted: sequelize.fn("NOW"),
			});
			return { status: "ok" };
		} catch (error) {
			throw new Error(error);
		}
	},
};
