import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { DefaultStatus } from 'src/enum';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { DefaultStatusDto } from 'src/common/dto/default-status.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly repo: Repository<Blog>,
  ) {}

  async create(dto: CreateBlogDto) {
    const result = await this.repo.findOne({ where: { title: dto.title } });
    if (result) {
      throw new ConflictException('Blogs already exists!');
    }
    const obj = Object.assign(dto);
    return this.repo.save(obj);
  }

  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const queryBuilder = this.repo.createQueryBuilder('blog');
      queryBuilder.andWhere('blog.status = :status', { status: DefaultStatus.ACTIVE });
    if (keyword) {
      queryBuilder.andWhere(
        '(blog.title LIKE :keyword OR blog.desc LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }
    queryBuilder.take(dto.limit).skip(dto.offset);
    const [result, count] = await queryBuilder.getManyAndCount();
    return { result, count };
  }

  async findAllByAdmin(dto: DefaultStatusPaginationDto) {
    const keyword = dto.keyword || '';
    const queryBuilder = this.repo.createQueryBuilder('blog');
    if (dto.status) {
      queryBuilder.andWhere('blog.status = :status', { status: dto.status });
    }
    if (keyword) {
      queryBuilder.andWhere(
        '(blog.title LIKE :keyword OR blog.desc LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }
    queryBuilder.take(dto.limit).skip(dto.offset);
    const [result, count] = await queryBuilder.getManyAndCount();
    return { result, count };
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({
      where: { id: id, status: DefaultStatus.ACTIVE },
    });
    if (!result) {
      throw new NotFoundException('Blog not found..');
    }
    return result;
  }

  async update(id: string, dto: UpdateBlogDto) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Blog not found..');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async image(image: string, result: Blog) {
    const obj = Object.assign(result, {
      image: process.env.BL_CDN_LINK + image,
      imagePath: image,
    });
    return this.repo.save(obj);
  }

  async status(id: string, dto: DefaultStatusDto) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Blog not found..');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }
}
