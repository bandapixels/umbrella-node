import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Volunteers {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'double', default: '' })
  x_location: number;

  @Column({ type: 'double', default: '' })
  y_location: number;

  @Column({ type: 'enum', enum: ['Escort', 'Lend'] })
  type: string
}
