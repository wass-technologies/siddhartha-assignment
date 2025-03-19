"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIFeatures {
    static async assignJwtToken(userId, jwtService) {
        return jwtService.sign({ id: userId });
    }
}
exports.default = APIFeatures;
//# sourceMappingURL=apiFeatures.utils.js.map