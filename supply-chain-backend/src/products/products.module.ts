import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { TrackingEvent } from '../tracking/tracking-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, TrackingEvent])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
