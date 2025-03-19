"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoginHistoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_login_history_dto_1 = require("./create-login-history.dto");
class UpdateLoginHistoryDto extends (0, mapped_types_1.PartialType)(create_login_history_dto_1.CreateLoginHistoryDto) {
}
exports.UpdateLoginHistoryDto = UpdateLoginHistoryDto;
//# sourceMappingURL=update-login-history.dto.js.map