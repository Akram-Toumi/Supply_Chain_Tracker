import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TrackingEvent } from './tracking-event.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingEvent, Product])],
  providers: [TrackingService],
  controllers: [TrackingController]
})
export class TrackingModule {}
