import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Like, Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { SettingDto } from './dto/setting.dto';
import { StatusSettingDto } from './dto/status-setting.dto';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private readonly repo: Repository<Setting>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(dto: SettingDto) {
    const result = await this.repo.findOne({
      where: [
        { admin_domain: dto.admin_domain },
        { user_domain: dto.user_domain },
      ],
    });
    if (result) {
      throw new ConflictException('Setting already exists!');
    }
    delete dto['id'];
    const obj = Object.create(dto);
    return this.repo.save(obj);
  }

  async findAll() {
    return this.repo.createQueryBuilder('setting').getOne()
  }

  async findOne(id: string) {
    return this.getSetting(id);
  }

  async findSetting(domain: string) {
    return this.getSetting(domain);
  }

  async update(id: string, dto: SettingDto) {
    const result = await this.getSetting(id);

    this.deleteSetting(id);
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async status(id: string, dto: StatusSettingDto) {
    const result = await this.getSetting(id);
    const obj = Object.assign(result, dto);
    this.deleteSetting(id);
    return this.repo.save(obj);
  }

  private async deleteSetting(id: string) {
    this.cacheManager.del('setting' + id);
  }

  private async getSetting(id: string) {
    let result: Setting = await this.cacheManager.get('setting' + id);
    if (!result) {
      result = await this.repo
        .createQueryBuilder('setting')
        // .leftJoinAndSelect('setting.slider', 'slider')
        .select([
          'setting.id',
          'setting.title',
          'setting.logo',
          'setting.logoPath',
          'setting.user_domain',
          'setting.admin_domain',
          'setting.status',
          'setting.createdAt',
          'setting.updatedAt',

          // 'slider.id',
          // 'slider.image',
        ])
        .where(
          'setting.id = :id OR setting.user_domain = :user_domain OR setting.admin_domain = :admin_domain',
          {
            id,
            user_domain: id,
            admin_domain: id,
          },
        )
        .getOne();
      this.cacheManager.set('setting' + id, result, 7 * 24 * 60 * 60 * 1000);
    }
    if (!result) {
      throw new NotFoundException(
        `Something bad happened! Please contact to admin!`,
      );
    }
    return result;
  }
}
