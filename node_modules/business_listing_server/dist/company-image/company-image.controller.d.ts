import { CompanyImageService } from './company-image.service';
import { Account } from 'src/account/entities/account.entity';
export declare class CompanyImageController {
    private readonly companyImageService;
    constructor(companyImageService: CompanyImageService);
    uploadMultipleFiles(user: Account, files: Express.Multer.File[]): Promise<any[]>;
    updateImage(id: string, file: Express.Multer.File): Promise<import("./entities/company-image.entity").CompanyImage & {
        file: string;
        fileName: string;
    }>;
    remove(id: string): Promise<import("./entities/company-image.entity").CompanyImage>;
}
