import { SettingDto } from './dto/setting.dto';
import { StatusSettingDto } from './dto/status-setting.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    version: Date;
    constructor(settingsService: SettingsService);
    create(dto: SettingDto): Promise<any>;
    findSettings(origin: string): Promise<import("./entities/setting.entity").Setting>;
    findAll(): Promise<import("./entities/setting.entity").Setting>;
    findOne(id: string): Promise<import("./entities/setting.entity").Setting>;
    update(id: string, dto: SettingDto): Promise<import("./entities/setting.entity").Setting & SettingDto>;
    status(id: string, dto: StatusSettingDto): Promise<import("./entities/setting.entity").Setting & StatusSettingDto>;
}
