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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const typeorm_2 = require("typeorm");
const class_entity_1 = require("../class/entities/class.entity");
const enum_1 = require("../enum");
const user_detail_entity_1 = require("../user-details/entities/user-detail.entity");
let StudentService = class StudentService {
    constructor(studentRepo, classRepo, schoolRepo) {
        this.studentRepo = studentRepo;
        this.classRepo = classRepo;
        this.schoolRepo = schoolRepo;
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
    async addStudent(userId, userRole, createStudentDto) {
        await this.verifyUserAccess(userId, createStudentDto.schoolId, userRole);
        const student = this.studentRepo.create(Object.assign(Object.assign({}, createStudentDto), { class: { id: createStudentDto.classId } }));
        return await this.studentRepo.save(student);
    }
    async getAllStudents(userId, schoolId, classId, userRole, paginationDto) {
        await this.verifyUserAccess(userId, schoolId, userRole);
        const { limit, offset } = paginationDto;
        const query = this.studentRepo
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.class', 'class')
            .leftJoinAndSelect('class.school', 'school')
            .where('class.schoolId = :schoolId', { schoolId });
        if (classId) {
            query.andWhere('class.id = :classId', { classId });
        }
        if (paginationDto.keyword.trim()) {
            query.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('LOWER(student.studentName) LIKE LOWER(:keyword)', { keyword: `%${paginationDto.keyword}%` });
            }));
        }
        query.orderBy({ 'class.className': 'ASC', 'student.studentName': 'ASC' });
        const [students, total] = await query.skip(offset).take(limit).getManyAndCount();
        return { total, students };
    }
    async updateStudent(userId, studentId, updateData, userRole) {
        const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['class', 'class.school'] });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        await this.verifyUserAccess(userId, student.class.school.id, userRole);
        Object.assign(student, updateData);
        return await this.studentRepo.save(student);
    }
    async deleteStudent(userId, studentId, userRole) {
        const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['class', 'class.school'] });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        await this.verifyUserAccess(userId, student.class.school.id, userRole);
        await this.studentRepo.delete({ id: studentId });
        return { message: 'Student deleted successfully' };
    }
    async promoteStudent(userId, studentId, promoteStudentDto, userRole) {
        const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['class', 'class.school'] });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        await this.verifyUserAccess(userId, student.class.school.id, userRole);
        const newClass = await this.classRepo.findOne({ where: { id: promoteStudentDto.classId } });
        if (!newClass) {
            throw new common_1.NotFoundException('Target class not found');
        }
        student.class = newClass;
        return await this.studentRepo.save(student);
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(class_entity_1.ClassEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map