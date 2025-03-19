import { Blog } from 'src/blogs/entities/blog.entity';
import { CallHistory } from 'src/call-history/entities/call-history.entity';
import { CompanyCategory } from 'src/company-category/entities/company-category.entity';
import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';
import { CompanyImage } from 'src/company-image/entities/company-image.entity';
import { CompanyKeyword } from 'src/company-keyword/entities/company-keyword.entity';
import { CompanySubCategory } from 'src/company-sub-category/entities/company-sub-category.entity';
import { AIType, DefaultStatus, LoginType, UserRole } from 'src/enum';
import { Faq } from 'src/faqs/entities/faq.entity';
import { Leed } from 'src/leed/entities/leed.entity';
import { LoginHistory } from 'src/login-history/entities/login-history.entity';
import { Notification } from 'src/notifications/entities/notification.entity';


import { UserDetail } from 'src/user-details/entities/user-detail.entity';
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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STAFF })
  role: UserRole;
  
  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.ACTIVE })
  status: DefaultStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SchoolDetails, (school) => school.subAdmin)
  schools: SchoolDetails[];


  @OneToMany(() => UserPermission, (userPermission) => userPermission.account)
  userPermission: UserPermission[];

  @OneToMany(() => UserDetail, (userDetail) => userDetail.account)
  userDetail: UserDetail[];


}
