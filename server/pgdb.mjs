import pg from "pg";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { logger } from "./logger.mjs";

dotenv.config();
let connectionString = process.env.CR_CONNECTION;

export const createPgClient = () => {
	dotenv.config();
	const pgPool = new pg.Pool({
		connectionString: process.env.CR_CONNECTION,
	});

	try {
		pgPool.connect((err) => {
			if (err) {
				throw new Error("pgPool: connection error", err);
			} else {
				logger.info("pgPool: Connection established");
			}
		});
	} catch (error) {
		throw new Error(Error);
	}
};

export const sequelize = new Sequelize(connectionString, {
	logging: (query) => {
		const queryString = `Sequelize: ${query}`;
		logger.info(queryString);
	},
});

export const initSequelize = async (db_url) => {
	dotenv.config();
	connectionString = db_url;

	try {
		await sequelize.sync();
		logger.info("Sequelize: Connection to database established.");
	} catch (error) {
		throw new Error("Sequelize:", error);
	}

	try {
		await sequelize.authenticate();
		logger.info("Sequelize: Connection succesfullt authetificated");
	} catch (error) {
		throw new Error("Sequelize:", error);
	}
};
