import { UpdateCompanyScheduleDto } from './dto/update-company-schedule.dto';
import { CompanySchedule } from './entities/company-schedule.entity';
import { Repository } from 'typeorm';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
export declare class CompanyScheduleService {
    private readonly repo;
    constructor(repo: Repository<CompanySchedule>);
    update(id: string, dto: UpdateCompanyScheduleDto): Promise<CompanySchedule & UpdateCompanyScheduleDto>;
    status(id: string, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<CompanySchedule> & CompanySchedule)[]>;
}
