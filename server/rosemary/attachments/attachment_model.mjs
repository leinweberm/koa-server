import { DataTypes } from "sequelize";

import { sequelize } from "../../pgdb.mjs";

export const Attachment = sequelize.define(
	"attachments",
	{
		attachment_uuid: {
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
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		temp_name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		mime_type: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		tableName: "attachments",
		schema: "rosemary",
		createdAt: "created",
		updatedAt: false,
		hooks: {
			afterSync: () => {
				const query = `ALTER TABLE rosemary.attachments OWNER TO mladmin;`;
				sequelize.query(query);
			},
		},
	}
);
