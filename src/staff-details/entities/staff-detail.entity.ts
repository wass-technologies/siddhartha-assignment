import { Account } from "src/account/entities/account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaffDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  dob: string;

  @ManyToOne(() => Account, (account) => account.staffDetails, { cascade: true })
  account: Account;
}