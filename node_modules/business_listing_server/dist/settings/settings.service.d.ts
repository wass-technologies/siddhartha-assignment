import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { SettingDto } from './dto/setting.dto';
import { StatusSettingDto } from './dto/status-setting.dto';
import { Setting } from './entities/setting.entity';
export declare class SettingsService {
    private readonly repo;
    private cacheManager;
    constructor(repo: Repository<Setting>, cacheManager: Cache);
    create(dto: SettingDto): Promise<any>;
    findAll(): Promise<Setting>;
    findOne(id: string): Promise<Setting>;
    findSetting(domain: string): Promise<Setting>;
    update(id: string, dto: SettingDto): Promise<Setting & SettingDto>;
    status(id: string, dto: StatusSettingDto): Promise<Setting & StatusSettingDto>;
    private deleteSetting;
    private getSetting;
}
