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
			type: DataTypes.STRING,
			defaultValue: null,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			defaultValue: null,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
			defaultValue: null,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
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
			type: DataTypes.STRING,
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
	}
);
