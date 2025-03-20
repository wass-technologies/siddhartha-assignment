import { PaginationDto, PaginationSDto, SchoolDto, StatusDto } from './dto/update-user-details';
import { School } from './entities/user-detail.entity';
import { SchoolService } from './user-details.service';
import { Response } from 'express';
export declare class SchoolController {
    private readonly schoolService;
    constructor(schoolService: SchoolService);
    createSchool(dto: SchoolDto): Promise<School>;
    findList(dto: PaginationDto): Promise<{
        result: School[];
        total: number;
    }>;
    getSchoolsByStatus(paginationDto: PaginationSDto): Promise<{
        result: School[];
        total: number;
    }>;
    findSchool(id: string): Promise<School>;
    update(id: string, dto: SchoolDto): Promise<School & SchoolDto>;
    status(id: string, dto: StatusDto): Promise<School & StatusDto>;
    deleteSchool(id: string): Promise<{
        message: string;
    }>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
