"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCallHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_call_history_dto_1 = require("./create-call-history.dto");
class UpdateCallHistoryDto extends (0, swagger_1.PartialType)(create_call_history_dto_1.CreateCallHistoryDto) {
}
exports.UpdateCallHistoryDto = UpdateCallHistoryDto;
//# sourceMappingURL=update-call-history.dto.js.map