"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactUsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_contact_us_dto_1 = require("./create-contact-us.dto");
class UpdateContactUsDto extends (0, swagger_1.PartialType)(create_contact_us_dto_1.CreateContactUsDto) {
}
exports.UpdateContactUsDto = UpdateContactUsDto;
//# sourceMappingURL=update-contact-us.dto.js.map