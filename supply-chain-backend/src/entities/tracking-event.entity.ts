// src/entities/tracking-event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('tracking_events')
export class TrackingEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (p) => p.events, { eager: true })
  product: Product;

  @ManyToOne(() => User, (u) => u.events, { eager: true })
  actor: User;

  @Column()
  status: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ nullable: true })
  notes: string;
}
