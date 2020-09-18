import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

export type UserStatus = 'Seeker' | 'Volunteer' | null

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('varchar')
  phone: string;

  @Column({ type: 'enum', enum: ['Seeker', 'Volunteer'], nullable: true })
  status: UserStatus;

  @Column({ default: false })
  isBusiness?: boolean

  @Column({ default: 0 })
  strikes: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at?: string;

  @BeforeInsert()
  private async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
