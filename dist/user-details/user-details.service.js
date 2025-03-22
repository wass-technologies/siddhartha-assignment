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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const typeorm_2 = require("typeorm");
const user_detail_entity_1 = require("./entities/user-detail.entity");
const createSchoolTable_utils_1 = require("../utils/createSchoolTable.utils");
const class_entity_1 = require("../class/entities/class.entity");
const student_entity_1 = require("../student/entities/student.entity");
const company_detail_entity_1 = require("../company-details/entities/company-detail.entity");
let SchoolService = class SchoolService {
    constructor(repo, accountrepo, classRepo, studentRepo, subAdminRepository) {
        this.repo = repo;
        this.accountrepo = accountrepo;
        this.classRepo = classRepo;
        this.studentRepo = studentRepo;
        this.subAdminRepository = subAdminRepository;
    }
    async getSchoolDetails(userId) {
        const school = await this.repo.findOne({
            where: { accountId: userId },
        });
        if (!school) {
            throw new common_1.ForbiddenException('No associated school found.');
        }
        return this.repo.createQueryBuilder('school')
            .leftJoinAndSelect('school.subAdmin', 'subAdmin')
            .select([
            'school.id',
            'school.name',
            'school.email',
            'school.address1',
            'school.address2',
            'school.state',
            'school.city',
            'school.area',
            'school.pincode',
            'school.status',
            'school.createdAt',
            'school.updatedAt',
            'subAdmin.id',
            'subAdmin.name'
        ])
            .where('school.id = :schoolId', { schoolId: school.id })
            .getOne();
    }
    async getTotalClasses(userId, paginationDto) {
        const school = await this.repo.findOne({ where: { accountId: userId } });
        if (!school) {
            throw new common_1.ForbiddenException('No associated school found.');
        }
        const { limit, offset, keyword } = paginationDto;
        const query = this.classRepo.createQueryBuilder('class')
            .where('class.schoolId = :schoolId', { schoolId: school.id })
            .select(['class.id', 'class.className'])
            .skip(offset)
            .take(limit);
        if (keyword) {
            query.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('class.className LIKE :keyword', { keyword: `%${keyword}%` });
            }));
        }
        const [result, total] = await query.getManyAndCount();
        return { result, total };
    }
    async getClassWiseStudentList(userId, classId, paginationDto) {
        const school = await this.repo.findOne({ where: { accountId: userId } });
        if (!school) {
            throw new common_1.ForbiddenException('No associated school found.');
        }
        const { limit, offset } = paginationDto;
        const query = this.classRepo.createQueryBuilder('class')
            .leftJoinAndSelect('class.students', 'students')
            .where('class.id = :classId', { classId })
            .andWhere('class.schoolId = :schoolId', { schoolId: school.id })
            .select([
            'class.id',
            'class.className',
            'students.id',
            'students.studentName',
            'students.age'
        ])
            .orderBy('students.studentName', 'ASC')
            .skip(offset)
            .take(limit);
        const [classData, total] = await query.getManyAndCount();
        if (!classData.length) {
            throw new common_1.ForbiddenException('You do not have access to this class.');
        }
        return {
            totalStudents: total,
            students: classData,
        };
    }
    async getStudentById(userId, studentId) {
        const school = await this.repo.findOne({ where: { accountId: userId } });
        if (!school) {
            throw new common_1.ForbiddenException('No associated school found.');
        }
        const query = this.studentRepo.createQueryBuilder('student')
            .leftJoinAndSelect('student.class', 'class')
            .where('student.id = :studentId', { studentId })
            .andWhere('class.schoolId = :schoolId', { schoolId: school.id })
            .select([
            'student.id',
            'student.name',
            'student.email',
            'class.id',
            'class.name'
        ]);
        const studentData = await query.getOne();
        if (!studentData) {
            throw new common_1.ForbiddenException('You do not have access to this student.');
        }
        return studentData;
    }
    async assignSubAdmin(dto) {
        const school = await this.repo
            .createQueryBuilder('school')
            .where('school.id = :schoolId', { schoolId: dto.schoolId })
            .getOne();
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        const subAdmin = await this.subAdminRepository
            .createQueryBuilder('subAdmin')
            .where('subAdmin.id = :subAdminId', { subAdminId: dto.subAdminId })
            .getOne();
        if (!subAdmin) {
            throw new common_1.NotFoundException('SubAdmin not found');
        }
        await this.repo
            .createQueryBuilder()
            .update(user_detail_entity_1.School)
            .set({ subAdmin: subAdmin })
            .where('id = :schoolId', { schoolId: dto.schoolId })
            .execute();
        return Object.assign(Object.assign({}, school), { subAdmin });
    }
    async generateSchoolListPdf(res) {
        const schools = await this.repo.find();
        if (schools.length === 0) {
            throw new common_1.NotFoundException('No schools found');
        }
        const doc = await (0, createSchoolTable_utils_1.createSchoolTable)(schools);
        res.setHeader('Content-Disposition', 'attachment; filename="schools_list.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.end();
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_detail_entity_1.School)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(2, (0, typeorm_1.InjectRepository)(class_entity_1.ClassEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(4, (0, typeorm_1.InjectRepository)(company_detail_entity_1.SubAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SchoolService);
//# sourceMappingURL=user-details.service.js.map