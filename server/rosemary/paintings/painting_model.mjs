import { DataTypes } from 'sequelize';

import { sequelize } from "../../pgdb.mjs";

export const Painting = sequelize.define('paintings',
	{
		painting_uuid: {
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
		painting_title: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		painting_description: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		data: {
			type: DataTypes.JSONB,
			allowNull: true,
		},
	},
	{
		tableName: 'paintings',
		schema: 'rosemary',
		createdAt: 'created',
		updatedAt: false,
	},
);