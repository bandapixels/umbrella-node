import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('bigint')
  phone: number;

  @Column({ default: 'null' })
  status: string;

  @Column({ nullable: true, default: false })
  isBusiness?: boolean

  @Column({ nullable: true, default: 0 })
  strikes: number

  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at?: string;
}
