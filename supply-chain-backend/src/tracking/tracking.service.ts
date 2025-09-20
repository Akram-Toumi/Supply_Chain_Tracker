import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingEvent } from './tracking-event.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { CreateTrackingDto } from './dto/create-tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEvent) private eventRepo: Repository<TrackingEvent>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async addEvent(user: User, dto: CreateTrackingDto) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    product.currentStatus = dto.status;
    if (dto.location) product.currentLocation = dto.location;
    await this.productRepo.save(product);

    const event = this.eventRepo.create({
      product,
      actor: user,
      status: dto.status,
      location: dto.location,
      notes: dto.notes,
    });
    await this.eventRepo.save(event);
    return event;
  }

  async trackProduct(productId: string) {
    return this.eventRepo.find({
      where: { product: { id: productId } },
      order: { timestamp: 'ASC' },
      relations: ['actor'],
    });
  }
}
