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
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const student_entity_1 = require("../student/entities/student.entity");
const enum_1 = require("../enum");
let ClassService = class ClassService {
    constructor(classRepo, schoolRepo, studentRepo) {
        this.classRepo = classRepo;
        this.schoolRepo = schoolRepo;
        this.studentRepo = studentRepo;
    }
    async addClass(subSchoolId, dto) {
        const subSchool = await this.schoolRepo.findOne({ where: { id: subSchoolId } });
        if (!subSchool) {
            throw new common_1.NotFoundException('School not found');
        }
        const existingClass = await this.classRepo.findOne({ where: { className: dto.name, school: subSchool } });
        if (existingClass) {
            throw new common_1.ConflictException('Class already exists');
        }
        const newClass = this.classRepo.create(Object.assign(Object.assign({}, dto), { className: dto.name, school: subSchool }));
        return await this.classRepo.save(newClass);
    }
    async deleteClass(subSchoolId, classId) {
        const classDelete = await this.classRepo.findOne({ where: { id: classId, school: { id: subSchoolId } } });
        if (!classDelete) {
            throw new common_1.NotFoundException('Class Not Found');
        }
        const subSchool = await this.schoolRepo.findOne({ where: { id: subSchoolId } });
    }
    async getAllClasses(schoolId, page = 1, pageSize = 10) {
        const school = await this.schoolRepo.findOne({ where: { id: schoolId } });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        const [classes, total] = await this.classRepo.findAndCount({
            where: { school: { id: schoolId } },
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: ['school'],
        });
        const formattedClass = classes.map((classEntity) => ({
            classId: classEntity.id,
            className: classEntity.className,
            schoolId: classEntity.school.id,
            schoolName: classEntity.school.schoolName,
        }));
        const hasNextPage = classes.length == pageSize;
        return {
            classes: formattedClass,
            totalClass: total,
            totalPage: Math.ceil(total / pageSize),
            currentPage: page,
            hasNextPage: hasNextPage,
        };
    }
    async getStudentsByClass(classId, user, page = 1, pageSize = 10) {
        const classEntity = await this.classRepo.findOne({
            where: { id: classId },
            relations: ['school'],
        });
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        if (classEntity.school.status !== 'ACTIVE') {
            throw new common_1.ForbiddenException('School is inactive');
        }
        if (user.role === enum_1.UserRole.SUB_ADMIN && user.id !== classEntity.school.accountId) {
            throw new common_1.ForbiddenException('You do not have access to this class');
        }
        const [students, total] = await this.studentRepo.findAndCount({
            where: { class: { id: classId } },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        return {
            classId: classEntity.id,
            className: classEntity.className,
            schoolId: classEntity.school.id,
            schoolName: classEntity.school.schoolName,
            students,
            totalStudents: total,
            totalPage: Math.ceil(total / pageSize),
            currentPage: page,
            hasNextPage: students.length === pageSize,
        };
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.ClassEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SchoolDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClassService);
//# sourceMappingURL=class.service.js.map