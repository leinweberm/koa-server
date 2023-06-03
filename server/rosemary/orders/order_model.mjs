import { DataTypes } from "sequelize";

import { sequelize } from "../../pgdb.mjs";

export const Order = sequelize.define(
	"Order",
	{
		order_uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		created: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		updated: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		order_status: {
			type: DataTypes.TEXT,
			defaultValue: "new",
			validate: {
				isIn: [["new", "confirmed", "sent", "closed", "cancel"]],
			},
		},
		customer_uid: {
			type: DataTypes.UUID,
			defaultValue: null,
		},
		customer_name: {
			type: DataTypes.TEXT,
			defaultValue: null,
		},
		customer_email: {
			type: DataTypes.TEXT,
			defaultValue: null,
		},
		customer_phone: {
			type: DataTypes.TEXT,
			defaultValue: null,
		},
		customer_address: {
			type: DataTypes.TEXT,
			defaultValue: null,
		},
		order_price: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		access_code: {
			type: DataTypes.TEXT,
			defaultValue: null,
		},
	},
	{
		tableName: "orders",
		schema: "rosemary",
		createdAt: "created",
		updatedAt: "updated",
		indexes: [
			{
				fields: ["order_uuid", "customer_name"],
				name: "idx_rosemary_orders_customer",
			},
		],
		hooks: {
			afterSync: () => {
				const query = `ALTER TABLE rosemary.orders OWNER TO mladmin;`;
				sequelize.query(query);
			},
		},
	}
);
