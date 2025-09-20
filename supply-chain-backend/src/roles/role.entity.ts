import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. PRODUCER, TRANSPORTER, ENTREPOT, DISTRIBUTOR, RETAILER, CONSUMER

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
