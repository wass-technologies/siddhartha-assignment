"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioFileFilter = exports.imageFileFilter = void 0;
exports.uploadFileHandler = uploadFileHandler;
exports.deleteFileHandler = deleteFileHandler;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
        return callback(new common_1.NotAcceptableException('Only Jpg, jpeg, png, mp4 files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const audioFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(mp3|mp4)$/)) {
        return callback(new common_1.NotAcceptableException('Only mp3 file are allowed!'), false);
    }
    callback(null, true);
};
exports.audioFileFilter = audioFileFilter;
async function uploadFileHandler(name, buffer) {
    try {
        const newBuffer = Buffer.from(buffer.toString('binary'), 'binary');
        const payload = await axios_1.default.put(process.env.SM_CDN_STORAGE + name, newBuffer, { headers: { AccessKey: process.env.SM_CDN_ACCESS } });
        return payload.data;
    }
    catch (error) {
        return { HttpCode: 405 };
    }
}
async function deleteFileHandler(name) {
    try {
        const payload = await axios_1.default.delete(process.env.SM_CDN_STORAGE + name, {
            headers: { AccessKey: process.env.SM_CDN_ACCESS },
        });
        return payload.data;
    }
    catch (error) {
        return { HttpCode: 405 };
    }
}
//# sourceMappingURL=fileUpload.utils.js.map