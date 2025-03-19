import { CompanyScheduleService } from './company-schedule.service';
import { UpdateCompanyScheduleDto } from './dto/update-company-schedule.dto';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
export declare class CompanyScheduleController {
    private readonly companyScheduleService;
    constructor(companyScheduleService: CompanyScheduleService);
    update(id: string, dto: UpdateCompanyScheduleDto): Promise<import("./entities/company-schedule.entity").CompanySchedule & UpdateCompanyScheduleDto>;
    status(id: string, dto: BoolStatusDto): Promise<(import("typeorm").DeepPartial<import("./entities/company-schedule.entity").CompanySchedule> & import("./entities/company-schedule.entity").CompanySchedule)[]>;
}
