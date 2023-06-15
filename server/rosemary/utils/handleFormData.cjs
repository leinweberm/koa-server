// const busboy = require("busboy");
// const fs = require("fs/promises");
// const fss = require("fs");

// const handleFormData = async (ctx, folderName) => {
// 	try {
// 		const busb = busboy({ headers: ctx.req.headers });
// 		const parsedData = {};
// 		const files = [];
// 		const mainFolderPath = `./${folderName}`;
// 		const fileNumber = 0;
// 		let attachment = {};

// 		if (!fss.existsSync(mainFolderPath)) {
// 			fss.mkdirSync(mainFolderPath);
// 		}

// 		return new Promise((resolve, reject) => {
// 			busb.on("field", (fieldName, value) => {
// 				parsedData[fieldName] = value;
// 			});

// 			busb.on("file", (fieldname, file, filename, encoding, mimetype) => {
// 				console.log("fieldname", fieldname);
// 				console.log("filename", filename);
// 				console.log("encoding", encoding);
// 				console.log("mimetype", mimetype);
// 				console.log("mainFolderPath", mainFolderPath);
// 				console.log("subFolderPath", subFolderPath);
// 				fileNumber++;
// 				let chunks = [];
// 				let fileSize = 0;
// 				let newDate = new Date().toISOString();
// 				newDate = newDate.replace(/[-:.]/g, "");
// 				let tempFileName = `${fieldname}${newDate}`;
// 				attachment = {
// 					name: filename,
// 					temp_name: tempFileName,
// 					path: `${mainFolderPath}}/${tempFileName}`,
// 					mime_type: mimetype,
// 				};

// 				busb.on("data", (chunk) => {
// 					chunks.push(chunk);
// 					fileSize += chunk.length;
// 				});

// 				busb.on("end", () => {
// 					console.log("fileSize", fileSize);
// 					attachment.size = fileSize;
// 					files.push(attachment);
// 					console.log(`File ${fileNumber} processed`);
// 				});
// 			});

// 			busb.on("finish", () => {
// 				console.log("attachment", attachment);
// 				console.log("parsedData", parsedData);
// 				resolve({ fields: { ...parsedData }, files });
// 			});

// 			busb.on("close", () => {
// 				chunks = [];
// 				fileSize = 0;
// 				attachment = {};
// 				newDate = null;
// 				tempFileName = null;
// 				throw new Error("Busboy closed with error");
// 			});

// 			busb.on("error", (error) => {
// 				ctx.req.unpipe(busboy);
// 				reject(new Error(error));
// 			});

// 			ctx.request.pipe(busboy);
// 		});
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// };

// module.exports = handleFormData;
