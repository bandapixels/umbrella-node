import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Volunteer {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'double', default: 0.0 })
  x_location: number;

  @Column({ type: 'double', default: 0.0 })
  y_location: number;
}
