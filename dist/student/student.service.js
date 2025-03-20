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
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
const enum_1 = require("../enum");
let StudentService = class StudentService {
    constructor(studentrepo, classRepo, schoolRepo) {
        this.studentrepo = studentrepo;
        this.classRepo = classRepo;
        this.schoolRepo = schoolRepo;
    }
    async addStudent(schoolId, classId, dto, subAdmin) {
        const school = await this.schoolRepo.findOne({ where: { id: schoolId },
        });
        if (!school) {
            throw new common_1.NotFoundException('Sub School not found');
        }
        if (school.accountId != subAdmin) {
            throw new common_1.NotFoundException('You are not authorized to perform action to this School');
        }
        if (school.status === enum_1.SchoolStatus.INACTIVE) {
            throw new common_1.ForbiddenException('School is not Active');
        }
        const classEntity = await this.classRepo.findOne({ where: { id: classId, school: { id: schoolId } },
            relations: ['school'] });
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        const newstudent = this.studentrepo.create(Object.assign(Object.assign({}, dto), { class: classEntity, studentName: dto.name }));
        return await this.studentrepo.save(newstudent);
    }
    async getAllStudents(dto) {
        const keyword = dto.keyword || '';
        const [result, total] = await this.studentrepo
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.class', 'class')
            .leftJoinAndSelect('class.school', 'school')
            .select([
            'student.id',
            'student.studentName',
            'student.age',
            'student.address',
            'school.id',
            'school.schoolName',
            'class.id',
            'class.className',
        ])
            .where(new typeorm_2.Brackets((qb) => {
            qb.where('student.studentName LIKE :name OR school.schoolName LIKE :school OR class.className LIKE :class', {
                name: '%' + keyword + '%',
                school: '%' + keyword + '%',
                class: '%' + keyword + '%',
            });
        }))
            .orderBy({ 'school.schoolName': 'ASC', 'class.className': 'ASC' })
            .skip(dto.offset)
            .take(dto.limit)
            .getManyAndCount();
        return { result, total };
    }
    async getStudentById(studentId) {
        const student = await this.studentrepo
            .createQueryBuilder('student')
            .where('student.id = :studentId', { studentId })
            .getOne();
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        return student;
    }
    async updateStudent(schoolName, classId, dto, id, subAdmin) {
        const subSchool = await this.schoolRepo.findOne({ where: { schoolName: schoolName },
        });
        if (!subSchool) {
            throw new common_1.NotFoundException('Sub School not found');
        }
        if (subSchool.accountId != subAdmin) {
            throw new common_1.NotFoundException('You are not authorized');
        }
        if (subSchool.status === enum_1.SchoolStatus.INACTIVE) {
            throw new common_1.ForbiddenException('School is not Active');
        }
        const classEntity = await this.classRepo.findOne({ where: { id: classId, school: { schoolName: schoolName } },
            relations: ['subSchool'] });
        if (!classEntity) {
            throw new common_1.NotFoundException('Class not found');
        }
        const student = await this.studentrepo.findOne({
            where: { id: id, class: { id: classId } },
            relations: ['class'],
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        if (dto.age)
            student.age = dto.age;
        if (dto.gender)
            student.gender = dto.gender;
        if (dto.address)
            student.address = dto.address;
        return await this.studentrepo.save(student);
    }
    async deleteStudent(studentId) {
        await this.studentrepo.delete(studentId);
        return { message: 'Student deleted successfully' };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(class_entity_1.ClassEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SchoolDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map