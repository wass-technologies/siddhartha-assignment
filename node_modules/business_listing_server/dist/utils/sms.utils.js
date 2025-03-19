"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = sendOtp;
exports.sendSMS = sendSMS;
const axios_1 = __importDefault(require("axios"));
async function sendOtp(phone, otp) {
    try {
        const msg = encodeURIComponent(`Hey, Your OTP is ${otp} for Login way2success App. Please don't share this OTP with anyone. It will expired in next 10 Min. https://way2success.team/ AJIT`);
        const payload = await axios_1.default.get(`http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=${process.env.BL_OTP_USERID}&Password=${process.env.BL_OTP_PASSWORD}&SenderID=${process.env.BL_OTP_SENDERID}&Phno=${phone}&Msg=${msg}&EntityID=${process.env.BL_OTP_ENTITYID}&TemplateID=${process.env.BL_OTP_TEMPLATE}`, {
            headers: {},
        });
        if (payload.data.Status == 'OK') {
            return true;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
}
async function sendSMS(phone, message) {
    try {
        const msg = encodeURIComponent(message);
        const payload = await axios_1.default.get(`http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=${process.env.BL_OTP_USERID}&Password=${process.env.BL_OTP_PASSWORD}&SenderID=${process.env.BL_OTP_SENDERID}&Phno=${phone}&Msg=${msg}&EntityID=${process.env.BL_OTP_ENTITYID}&TemplateID=${process.env.BL_OTP_TEMPLATE}`, {
            headers: {},
        });
        if (payload.data.Status == 'OK') {
            return true;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=sms.utils.js.map