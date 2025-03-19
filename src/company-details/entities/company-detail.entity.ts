import { Account } from 'src/account/entities/account.entity';
import { CallHistory } from 'src/call-history/entities/call-history.entity';
import {  ClassEntity } from 'src/class/entities/class.entity';
import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import { CompanySubCategory } from 'src/company-sub-category/entities/company-sub-category.entity';
import { SchoolStatus } from 'src/enum';
import { Leed } from 'src/leed/entities/leed.entity';

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
export class SchoolDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  profileId: number;



  @Column({ type: 'varchar', length: 55, nullable: true })
  schoolName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  area: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pincode: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  schoolDesc: string;

 
  @Column({ type: 'enum', enum: SchoolStatus, default: SchoolStatus.PENDING })
  status: SchoolStatus;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Account, (account) => account.schools, { nullable: true, onDelete: 'SET NULL' })
  subAdmin: Account;

  @OneToMany(
    () => CompanySchedule,
    (companySchedule) => companySchedule.companyDetail,
  )
  companySchedule: CompanySchedule[];



  @OneToMany(() => Leed, (leed) => leed.companyDetail)
  leed: Leed[];
  @OneToMany(() => ClassEntity, (classEntity) => classEntity.school)
  classes: ClassEntity[];

}
