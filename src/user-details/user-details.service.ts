import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Brackets, Repository } from 'typeorm';
import { PaginationSDto, UpdateUserDetailDto } from './dto/update-user-details';
import { UserDetail } from './entities/user-detail.entity';
import { UpdateUserStatusDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetail) private readonly repo: Repository<UserDetail>,
    @InjectRepository(Account)
    private readonly accountrepo: Repository<Account>,
  ) {}

  async getProfile(id: string) {
    const result = await this.repo
      .createQueryBuilder('userDetail')
      .leftJoinAndSelect('userDetail.account', 'account')
      .leftJoinAndSelect('account.userAddress', 'userAddress')
      .select([
        'userDetail.id',
        'userDetail.name',
        'userDetail.email',
        'userDetail.accountId',

        'account.id',
        'account.email',
        'account.roles',
        'account.status',
        'userAddress.id',
        'userAddress.name',
        'userAddress.altPhone',
        'userAddress.phone',
        'userAddress.city',
        'userAddress.state',
        'userAddress.pincode',
        'userAddress.address',
        'userAddress.status',
      ])
      .where('userDetail.accountId = :id', { id: id })
      .getOne();
    if (!result) {
      throw new NotFoundException('User not found!');
    }
    return result;
  }

  async findAll(dto: PaginationSDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.repo
      .createQueryBuilder('userDetail')
      .leftJoinAndSelect('userDetail.account', 'account')
      // .where('userDetail.status = :status', { status: dto.status })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'account.phoneNumber LIKE :phoneNumber OR userDetail.name LIKE :name OR userDetail.gstNo LIKE :gstNo',
            {
              phoneNumber: '%' + keyword + '%',
              name: '%' + keyword + '%',
              gstNo: '%' + keyword + '%',
            },
          );
        }),
      )
      .skip(dto.offset)
      .take(dto.limit)
      .orderBy({ 'userDetail.name': 'ASC' })
      .getManyAndCount();
    return { result, total };
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({
      where: { accountId: id },
    });
    if (!result) {
      throw new NotFoundException('User not found!');
    }
    return result;
  }

  async update(dto: UpdateUserDetailDto, accountId: string) {
    const result = await this.repo.findOne({ where: { accountId: accountId } });
    if (!result) {
      throw new NotFoundException('User profile not found!');
    }
    const obj = Object.assign(result, dto);
    return await this.repo.save(obj);
  }


  async updateUserStatus(userId: string, updateUserStatusDto: UpdateUserStatusDto) {
    const user = await this.accountrepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = updateUserStatusDto.status;
    await this.accountrepo.save(user);

    return { message: `User status updated to ${user.status}` };
  }

  async getUserStatus(userId: string) {
    const user = await this.accountrepo.findOne({
      where: { id: userId },
      select: ['id', 'status', 'name', 'role'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { id: user.id, name:user.name, role: user.role,status: user.status };
  }

}
