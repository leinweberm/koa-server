import { DataTypes } from "sequelize";

import { sequelize } from "../../pgdb.mjs";

export const Painting = sequelize.define(
	"paintings",
	{
		painting_uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		created: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		deleted: {
			type: DataTypes.DATE,
			defaultValue: null,
			allowNull: true,
		},
		price: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: true,
		},
		painting_title: {
			type: DataTypes.JSONB,
			defaultValue: '{"en":"", "cs":""}',
			allowNull: true,
		},
		painting_description: {
			type: DataTypes.JSONB,
			defaultValue: '{"en":"", "cs":""}',
			allowNull: true,
		},
		data: {
			type: DataTypes.JSONB,
			defaultValue: null,
			allowNull: true,
		},
	},
	{
		tableName: "paintings",
		schema: "rosemary",
		createdAt: "created",
		updatedAt: false,
		hooks: {
			afterSync: () => {
				const query = `ALTER TABLE rosemary.paintings OWNER TO mladmin;`;
				sequelize.query(query);
			},
		},
	}
);
