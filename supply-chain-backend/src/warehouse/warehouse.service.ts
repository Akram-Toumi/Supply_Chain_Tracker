import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepo: Repository<Warehouse>,
  ) {}

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseRepo.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Warehouse> {
    return this.warehouseRepo.findOneOrFail({
      where: { id },
      relations: ['products'],
    });
  }

  async create(data: Partial<Warehouse>): Promise<Warehouse> {
    const warehouse = this.warehouseRepo.create(data);
    return this.warehouseRepo.save(warehouse);
  }

  async update(id: number, data: Partial<Warehouse>): Promise<Warehouse> {
    await this.warehouseRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.warehouseRepo.delete(id);
  }
}
