import { SchoolDetailsService } from './company-details.service';
import { PaginationDto, PaginationSDto, SchoolDetailDto, StatusDto } from './dto/company-detail.dto';
import { Response } from 'express';
export declare class SchoolDetailsController {
    private readonly schoolService;
    constructor(schoolService: SchoolDetailsService);
    createSchool(dto: SchoolDetailDto): Promise<import("./entities/company-detail.entity").SchoolDetails>;
    findList(dto: PaginationDto): Promise<{
        result: import("./entities/company-detail.entity").SchoolDetails[];
        total: number;
    }>;
    getSchoolsByStatus(paginationDto: PaginationSDto): Promise<{
        result: import("./entities/company-detail.entity").SchoolDetails[];
        total: number;
    }>;
    findSchool(id: string): Promise<import("./entities/company-detail.entity").SchoolDetails>;
    update(id: string, dto: SchoolDetailDto): Promise<import("./entities/company-detail.entity").SchoolDetails & SchoolDetailDto>;
    status(id: string, dto: StatusDto): Promise<import("./entities/company-detail.entity").SchoolDetails & StatusDto>;
    deleteSchool(id: string): Promise<{
        message: string;
    }>;
    generateSchoolListPdf(res: Response): Promise<void>;
}
