import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { TrackingEvent } from '../entities/tracking-event.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(TrackingEvent) private eventRepo: Repository<TrackingEvent>,
  ) {}

  async createProduct(user: User, dto: CreateProductDto) {
    if (user.role !== 'producer') throw new ForbiddenException('Only producers can create products');
    const product = this.productRepo.create({
      id: uuidv4(),
      name: dto.name,
      batchNumber: dto.batchNumber,
      producer: user,
      currentStatus: 'Produced',
      currentLocation: dto.currentLocation || 'Factory',
    });
    await this.productRepo.save(product);

    const event = this.eventRepo.create({
      product,
      actor: user,
      status: 'Produced',
      location: dto.currentLocation || 'Factory',
      notes: 'Initial creation',
    });
    await this.eventRepo.save(event);

    return product;
  }

  async listProducts() {
    return this.productRepo.find();
  }

  async getProductById(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
