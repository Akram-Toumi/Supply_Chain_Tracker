// src/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { TrackingEvent } from './tracking-event.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  batchNumber: string;

  @ManyToOne(() => User, { nullable: true })
  producer: User;

  @Column({ nullable: true })
  currentLocation: string;

  @Column({ nullable: true })
  currentStatus: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => TrackingEvent, (e) => e.product)
  events: TrackingEvent[];
}
