import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { DefaultStatus } from 'src/enum';
import { Repository } from 'typeorm';
import { LanguageDto, PaginationDto } from './dto/language.dto';
import { Language } from './entities/language.entity';
export declare class LanguagesService {
    private readonly repo;
    constructor(repo: Repository<Language>);
    create(dto: LanguageDto): Promise<any>;
    find(dto: PaginationDto): Promise<{
        result: Language[];
        total: number;
    }>;
    findAll(dto: DefaultStatusPaginationDto): Promise<{
        result: Language[];
        total: number;
    }>;
    update(id: string, dto: LanguageDto): Promise<Language & LanguageDto>;
    status(id: string, dto: DefaultStatus): Promise<(Language & DefaultStatus) & Language>;
}
