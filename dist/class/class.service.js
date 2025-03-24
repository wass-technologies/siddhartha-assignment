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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_entity_1 = require("./entities/class.entity");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../student/entities/student.entity");
const enum_1 = require("../enum");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
let ClassService = class ClassService {
    constructor(classRepo, schoolRepo, studentRepo) {
        this.classRepo = classRepo;
        this.schoolRepo = schoolRepo;
        this.studentRepo = studentRepo;
    }
    async verifyUserAccess(userId, schoolId, userRole) {
        if (userRole === enum_1.UserRole.SCHOOL) {
            const school = await this.schoolRepo.findOne({ where: { id: schoolId, accountId: userId } });
            if (!school) {
                throw new common_1.ForbiddenException('You do not have permission to manage this school');
            }
        }
        else if (userRole === enum_1.UserRole.SUB_ADMIN) {
            const isAuthorized = await this.schoolRepo
                .createQueryBuilder('school')
                .leftJoin('school.subAdmin', 'subAdmin')
                .where('school.id = :schoolId', { schoolId })
                .andWhere('subAdmin.accountId = :userId', { userId })
                .getExists();
            if (!isAuthorized) {
                throw new common_1.ForbiddenException('You do not have permission to manage this school');
            }
        }
        else {
            throw new common_1.ForbiddenException('Invalid role');
        }
    }
    async addClassToSchool(userId, schoolId, className, userRole) {
        await this.verifyUserAccess(userId, schoolId, userRole);
        const classExists = await this.classRepo
            .createQueryBuilder('class')
            .where('LOWER(class.className) = LOWER(:className)', { className })
            .andWhere('class.schoolId = :schoolId', { schoolId })
            .getExists();
        if (classExists) {
            throw new common_1.ConflictException('Class already exists');
        }
        const newClass = this.classRepo.create({ className, school: { id: schoolId } });
        return await this.classRepo.save(newClass);
    }
    async getAllClassesForSchool(userId, schoolId, userRole, paginationDto) {
        await this.verifyUserAccess(userId, schoolId, userRole);
        const { limit, offset, keyword = '' } = paginationDto;
        const query = this.classRepo
            .createQueryBuilder('class')
            .where('class.schoolId = :schoolId', { schoolId });
        if (keyword.trim()) {
            query.andWhere('LOWER(class.className) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
        }
        const [classes, total] = await query.skip(offset).take(limit).getManyAndCount();
        return { total, classes };
    }
    async getClassById(userId, classId, userRole) {
        const classEntity = await this.classRepo
            .createQueryBuilder('class')
            .leftJoinAndSelect('class.school', 'school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('class.id = :classId', { classId })
            .getOne();
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        await this.verifyUserAccess(userId, classEntity.school.id, userRole);
        return classEntity;
    }
    async updateClass(userId, classId, className, userRole) {
        const classEntity = await this.classRepo.findOne({ where: { id: classId } });
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        await this.verifyUserAccess(userId, classEntity.school.id, userRole);
        classEntity.className = className;
        return await this.classRepo.save(classEntity);
    }
    async deleteClass(userId, classId, userRole) {
        const classEntity = await this.classRepo.findOne({ where: { id: classId } });
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        await this.verifyUserAccess(userId, classEntity.school.id, userRole);
        await this.classRepo.delete({ id: classId });
        return { message: 'Class deleted successfully' };
    }
    async getStudentsInClass(userId, classId, userRole, paginationDto) {
        const { limit, offset } = paginationDto;
        const classEntity = await this.classRepo
            .createQueryBuilder('class')
            .leftJoinAndSelect('class.school', 'school')
            .where('class.id = :classId', { classId })
            .getOne();
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        await this.verifyUserAccess(userId, classEntity.school.id, userRole);
        const [students, total] = await this.studentRepo
            .createQueryBuilder('student')
            .where('student.classId = :classId', { classId })
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return { total, students };
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.ClassEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClassService);
//# sourceMappingURL=class.service.js.map