"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractJwtFromWsHeader = exports.WsJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../auth.service");
let WsJwtStrategy = class WsJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: exports.ExtractJwtFromWsHeader,
            secretOrKey: process.env.BL_JWT_SECRET,
        });
        this.authService = authService;
    }
    async validate(payload) {
        const user = await this.authService.validate(payload.id, payload.role);
        if (!user) {
            throw new common_1.UnauthorizedException('Authentication failed');
        }
        return user;
    }
};
exports.WsJwtStrategy = WsJwtStrategy;
exports.WsJwtStrategy = WsJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], WsJwtStrategy);
const ExtractJwtFromWsHeader = (req) => {
    var _a;
    if (req['handshake']) {
        return (_a = req['handshake'].headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    }
    else {
        throw new common_1.UnauthorizedException('Authentication failed');
    }
};
exports.ExtractJwtFromWsHeader = ExtractJwtFromWsHeader;
//# sourceMappingURL=ws.strategy.js.map