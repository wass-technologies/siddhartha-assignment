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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyImageController = void 0;
const common_1 = require("@nestjs/common");
const company_image_service_1 = require("./company-image.service");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enum_1 = require("../enum");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const account_entity_1 = require("../account/entities/account.entity");
let CompanyImageController = class CompanyImageController {
    constructor(companyImageService) {
        this.companyImageService = companyImageService;
    }
    async uploadMultipleFiles(user, files) {
        const uploadPromises = files.map((file) => this.companyImageService.create(user.id, file.path));
        return Promise.all(uploadPromises);
    }
    async updateImage(id, file) {
        const fileData = await this.companyImageService.findOne(id);
        return this.companyImageService.updateImage(file.path, fileData);
    }
    remove(id) {
        return this.companyImageService.remove(id);
    }
};
exports.CompanyImageController = CompanyImageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/companydetail/images',
            filename: (req, file, callback) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_entity_1.Account, Array]),
    __metadata("design:returntype", Promise)
], CompanyImageController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Put)('updateMedia/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/companydetail/images',
            filename: (req, file, callback) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyImageController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enum_1.UserRole.MAIN_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyImageController.prototype, "remove", null);
exports.CompanyImageController = CompanyImageController = __decorate([
    (0, common_1.Controller)('company-image'),
    __metadata("design:paramtypes", [company_image_service_1.CompanyImageService])
], CompanyImageController);
//# sourceMappingURL=company-image.controller.js.map