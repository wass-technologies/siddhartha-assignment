import { SchoolDetails } from 'src/company-details/entities/company-detail.entity';

import { Student } from 'src/student/entities/student.entity';
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

  @ManyToOne(() => SchoolDetails, (company) => company.classes, {
    onDelete: 'CASCADE',
  })
  school: SchoolDetails;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
