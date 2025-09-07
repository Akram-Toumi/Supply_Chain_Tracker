import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrackingEvent } from './tracking-event.entity';

export enum UserRole {
  PRODUCER = 'producer',
  TRANSPORTER = 'transporter',
  ENTREPOT = 'entrepot',
  DISTRIBUTOR = 'distributor',
  RETAILER = 'retailer',
  CONSUMER = 'consumer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // ✅ MySQL supports enum
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TrackingEvent, (event) => event.actor)
  events: TrackingEvent[];
}
