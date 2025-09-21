// src/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { TrackingEvent } from '../tracking/tracking-event.entity';
import { Warehouse } from '../warehouse/warehouse.entity';

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

  @Column({ nullable: true })
  blockchainId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => TrackingEvent, (e) => e.product)
  events: TrackingEvent[];

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products, { onDelete: 'SET NULL' })
  warehouse: Warehouse;
}
