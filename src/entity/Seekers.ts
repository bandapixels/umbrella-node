import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('seekers')
export class Seekers {
  @PrimaryColumn({
    type: 'integer',
  })
  user_id: number;

  @Column({ type: 'numeric', default: 0.0 })
  x_location: number;

  @Column({ type: 'numeric', default: 0.0 })
  y_location: number;
}
