import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Volunteers {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'double', default: 0.0 })
  x_location: number;

  @Column({ type: 'double', default: 0.0 })
  y_location: number;

  @Column({ type: 'enum', enum: ['Escort', 'Lend'] })
  type: 'Escort' | 'Lend' | null
}
