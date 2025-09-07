import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TrackingModule } from './tracking/tracking.module';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { TrackingEvent } from './entities/tracking-event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'supply_chain',
      entities: [User, Product, TrackingEvent],
      synchronize: true, // dev only
    }),
    AuthModule,
    ProductsModule,
    TrackingModule,
  ],
})
export class AppModule {}
