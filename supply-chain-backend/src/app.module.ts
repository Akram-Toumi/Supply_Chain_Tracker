// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entities
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Product } from './products/product.entity';
import { TrackingEvent } from './tracking/tracking-event.entity';
import { Warehouse } from './warehouse/warehouse.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { TrackingModule } from './tracking/tracking.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [
    // Load environment variables from .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'supply_chain',
      entities: [User, Role, Product, TrackingEvent, Warehouse],
      synchronize: true, // ❗ dev only – disable in production
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    TrackingModule,
    WarehouseModule,
  ],
})
export class AppModule {}