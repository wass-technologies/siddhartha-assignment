

import { Student } from 'src/student/entities/student.entity';
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
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  className: string;

  @ManyToOne(() => School, (company) => company.classes, {
    onDelete: 'CASCADE',
  })
  school: School;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
