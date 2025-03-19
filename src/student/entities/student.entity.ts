import { ClassEntity } from 'src/class/entities/class.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  studentName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gender: string;

  @Column()
  address:string;

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.students, {
    onDelete: 'CASCADE',
  })
  class: ClassEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
