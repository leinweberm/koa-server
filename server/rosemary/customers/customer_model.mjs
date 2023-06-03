import { DataTypes } from "sequelize";

import { sequelize } from "../../pgdb.mjs";

export const Customer = sequelize.define(
	"customers",
	{
		customer_uid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
			defaultValue: null,
			allowNull: true,
		},
		address: {
			type: DataTypes.TEXT,
			defaultValue: null,
			allowNull: true,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.TEXT,
			defaultValue: null,
			allowNull: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		status: {
			type: DataTypes.TEXT,
			defaultValue: "regular",
			allowNull: false,
		},
		spendings: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	},
	{
		tableName: "customers",
		schema: "rosemary",
		createdAt: "created",
		updatedAt: false,
		hooks: {
			afterSync: () => {
				const query = `ALTER TABLE rosemary.customers OWNER TO mladmin;`;
				sequelize.query(query);
			},
		},
	}
);
