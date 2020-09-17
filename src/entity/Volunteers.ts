import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Volunteers {
  @PrimaryColumn({
    type: 'integer',
  })
  user_id: number;

  @Column({ type: 'numeric', default: 0.0 })
  x_location: number;

  @Column({ type: 'numeric', default: 0.0 })
  y_location: number;

  @Column({ type: 'enum', enum: ['Escort', 'Lend', null], nullable: true })
  type: 'Escort' | 'Lend' | null
}
