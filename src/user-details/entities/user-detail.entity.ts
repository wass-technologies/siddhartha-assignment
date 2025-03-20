import { Account } from 'src/account/entities/account.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { CompanySchedule } from 'src/company-schedule/entities/company-schedule.entity';
import { DefaultStatus, SchoolStatus, UserRole } from 'src/enum';
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
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @Column({ type: 'enum', enum: SchoolStatus, default: SchoolStatus.PENDING })
  status: SchoolStatus;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  // @OneToMany(
  //   () => CompanySchedule,
  //   (companySchedule) => companySchedule.companyDetail,
  // )
  // companySchedule: CompanySchedule[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Account, (account) => account.schools,{cascade: true,    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',}
  )
  account: Account;

  @OneToMany(() => SubAdmin, (subAdmin) => subAdmin.school)
  subAdmins: SubAdmin[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.school)
  classes: ClassEntity[];

}
  