
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { DefaultStatus, UserRole } from 'src/enum';
import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';
import { School } from 'src/user-details/entities/user-detail.entity';


import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 55 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({  nullable: true })
  password: string;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.account)
  userPermission: UserPermission[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STAFF })
  role: UserRole;

  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.ACTIVE })
  status: DefaultStatus;

  @OneToMany(() => StaffDetail, (staffDetail) => staffDetail.account)
  staffDetails: StaffDetail[];

  @OneToMany(() => School, (school) => school.account)
  schools: School[];

  @OneToMany(() => SubAdmin, (subAdmin) => subAdmin.account)
  subAdmins: SubAdmin[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}



