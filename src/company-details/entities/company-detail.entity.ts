import { Account } from 'src/account/entities/account.entity';
import { CallHistory } from 'src/call-history/entities/call-history.entity';
import {  ClassEntity } from 'src/class/entities/class.entity';
import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import { CompanySubCategory } from 'src/company-sub-category/entities/company-sub-category.entity';
import { SchoolStatus } from 'src/enum';
import { Leed } from 'src/leed/entities/leed.entity';
import { School } from 'src/user-details/entities/user-detail.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class SubAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;


  @ManyToOne(() => Account, (account) => account.subAdmins)
  account: Account;

  @OneToMany(() => School, (school) => school.subAdmin)
  schools: School[];
}





