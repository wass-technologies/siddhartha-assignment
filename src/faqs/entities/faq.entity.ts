import { Account } from 'src/account/entities/account.entity';
import { DefaultStatus } from 'src/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.PENDING })
  status: DefaultStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  // @ManyToOne(() => Account, (account) => account.faq, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // account: Account[];
}
