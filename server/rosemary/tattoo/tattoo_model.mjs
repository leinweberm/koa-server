import { DataTypes } from 'sequelize';

import { sequelize } from "../../pgdb.mjs";

export const Tattoo = sequelize.define('tattoo',
	{
		tattoo_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		created: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		deleted: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		tattoo_title: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		tattoo_description: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		data: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
	},
	{
		tableName: 'tattoo',
		schema: 'rosemary',
		createdAt: 'created',
		updatedAt: false,
	},
);