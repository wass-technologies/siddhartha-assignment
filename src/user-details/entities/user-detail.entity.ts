import { Account } from 'src/account/entities/account.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { SubAdmin } from 'src/company-details/entities/company-detail.entity';
import { DefaultStatus, UserRole } from 'src/enum';
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

  @Column()
  address: string;

  @ManyToOne(() => Account, (account) => account.schools)
  account: Account;

  @OneToMany(() => SubAdmin, (subAdmin) => subAdmin.school)
  subAdmins: SubAdmin[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.school)
  classes: ClassEntity[];

}
  