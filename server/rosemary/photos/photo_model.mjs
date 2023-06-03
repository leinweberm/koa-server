import { DataTypes } from "sequelize";

import { sequelize } from "../../pgdb.mjs";

export const Photo = sequelize.define(
	"photos",
	{
		photos_uuid: {
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
		photo_title: {
			type: DataTypes.JSONB,
			defaultValue: '{"en":"", "cs":""}',
			allowNull: true,
		},
		photo_description: {
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
		tableName: "photos",
		schema: "rosemary",
		createdAt: "created",
		updatedAt: false,
		hooks: {
			afterSync: () => {
				const query = `ALTER TABLE rosemary.photos OWNER TO mladmin;`;
				sequelize.query(query);
			},
		},
	}
);
