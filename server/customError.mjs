export class CustomError extends Error {
	constructor(modul, message) {
		const customMessage = `[${modul}]${message}`;
		super(customMessage);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
