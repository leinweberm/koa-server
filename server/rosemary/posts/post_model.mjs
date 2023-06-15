import { DataTypes } from "sequelize";

import { sequelize } from "../../pgdb.mjs";

export const Post = sequelize.define(
	"posts",
	{
		post_uuid: {
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
		post_title: {
			type: DataTypes.JSONB,
			defaultValue: '{"en":"", "cs":""}',
			allowNull: false,
		},
		post_description: {
			type: DataTypes.JSONB,
			defaultValue: '{"en":"", "cs":""}',
			allowNull: false,
		},
		data: {
			type: DataTypes.JSONB,
			defaultValue: null,
			allowNull: true,
		},
	},
	{
		tableName: "posts",
		schema: "rosemary",
		createdAt: "created",
		updatedAt: false,
		hooks: {
			afterSync: () => {
				const query = `ALTER TABLE rosemary.posts OWNER TO mladmin;`;
				sequelize.query(query);
			},
		},
	}
);
