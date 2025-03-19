import { CompanyImage } from './entities/company-image.entity';
import { Repository } from 'typeorm';
export declare class CompanyImageService {
    private readonly repo;
    constructor(repo: Repository<CompanyImage>);
    create(accountId: string, image: string): Promise<any>;
    findOne(id: string): Promise<CompanyImage>;
    updateImage(image: string, result: CompanyImage): Promise<CompanyImage & {
        file: string;
        fileName: string;
    }>;
    remove(id: string): Promise<CompanyImage>;
}
