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
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
let ClassService = class ClassService {
    constructor(classRepo, schoolRepo, studentRepo) {
        this.classRepo = classRepo;
        this.schoolRepo = schoolRepo;
        this.studentRepo = studentRepo;
    }
    async addClass(userId, schoolId, dto) {
        const isAuthorized = await this.schoolRepo
            .createQueryBuilder('school')
            .leftJoin('school.subAdmin', 'subAdmin')
            .where('school.id = :schoolId', { schoolId })
            .andWhere('subAdmin.accountId = :userId', { userId })
            .getExists();
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('Access denied.');
        }
        const classExists = await this.classRepo
            .createQueryBuilder('class')
            .where('LOWER(class.className) = LOWER(:className)', { className: dto.className })
            .andWhere('class.schoolId = :schoolId', { schoolId })
            .getExists();
        if (classExists) {
            throw new common_1.ConflictException('Class already exists.');
        }
        const newClass = this.classRepo.create(Object.assign(Object.assign({}, dto), { school: { id: schoolId } }));
        return await this.classRepo.save(newClass);
    }
    async getAllClasses(userId, schoolId, dto) {
        const { limit, offset, keyword = '' } = dto;
        const isAuthorized = await this.schoolRepo
            .createQueryBuilder('school')
            .leftJoin('school.subAdmin', 'subAdmin')
            .where('school.id = :schoolId', { schoolId })
            .andWhere('subAdmin.accountId = :userId', { userId })
            .getExists();
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('Access denied to this school.');
        }
        const query = this.classRepo
            .createQueryBuilder('class')
            .leftJoinAndSelect('class.school', 'school')
            .select([
            'class.id',
            'class.className',
            'school.id',
            'school.name',
        ])
            .where('class.schoolId = :schoolId', { schoolId });
        if (keyword.trim()) {
            query.andWhere('LOWER(class.className) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
        }
        const [classes, total] = await query
            .skip(offset)
            .take(limit)
            .orderBy('class.className', 'ASC')
            .getManyAndCount();
        return { total, classes };
    }
    async getClassById(userId, classId) {
        var _a;
        const classEntity = await this.classRepo
            .createQueryBuilder('class')
            .leftJoinAndSelect('class.school', 'school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('class.id = :classId', { classId })
            .getOne();
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        if (((_a = classEntity.school.subAdmin) === null || _a === void 0 ? void 0 : _a.accountId) !== userId) {
            throw new common_1.ForbiddenException('Access denied to this school.');
        }
        return classEntity;
    }
    async getStudents(dto, classId, user) {
        var _a;
        const classEntity = await this.classRepo
            .createQueryBuilder('class')
            .leftJoinAndSelect('class.school', 'school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .where('class.id = :classId', { classId })
            .getOne();
        if (!classEntity)
            throw new common_1.NotFoundException('Class not found');
        if (classEntity.school.status !== 'ACTIVE')
            throw new common_1.ForbiddenException('School is inactive');
        if (((_a = classEntity.school.subAdmin) === null || _a === void 0 ? void 0 : _a.accountId) !== user.id) {
            throw new common_1.ForbiddenException('You do not have access to this class');
        }
        const [students, total] = await this.studentRepo
            .createQueryBuilder('student')
            .where('student.classId = :classId', { classId })
            .orderBy('student.name', 'ASC')
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result: students, total };
    }
    async remove(user, schoolId, classId) {
        const isAuthorized = await this.schoolRepo
            .createQueryBuilder('school')
            .leftJoin('school.subAdmin', 'subAdmin')
            .where('school.id = :schoolId', { schoolId })
            .andWhere('subAdmin.accountId = :userId', { userId: user.id })
            .getExists();
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('You do not have permission to delete this class');
        }
        const classExists = await this.classRepo
            .createQueryBuilder('class')
            .where('class.id = :classId', { classId })
            .andWhere('class.schoolId = :schoolId', { schoolId })
            .getExists();
        if (!classExists) {
            throw new common_1.NotFoundException('Class not found');
        }
        await this.classRepo.delete({ id: classId });
        return { message: 'Class deleted successfully' };
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