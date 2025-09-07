import { DataSource } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { TrackingEvent } from './entities/tracking-event.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Product, TrackingEvent],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);
  const eventRepo = AppDataSource.getRepository(TrackingEvent);

  // Clear previous data
  await eventRepo.delete({});
  await productRepo.delete({});
  await userRepo.delete({});

  const password = await bcrypt.hash('password', 10);

  const producer = userRepo.create({ name: 'Producer1', email: 'producer@example.com', password, role: UserRole.PRODUCER });
  const transporter = userRepo.create({ name: 'Transporter1', email: 'transporter@example.com', password, role: UserRole.TRANSPORTER });
  const entrepot = userRepo.create({ name: 'Entrepot1', email: 'entrepot@example.com', password, role: UserRole.ENTREPOT });
  const distributor = userRepo.create({ name: 'Distributor1', email: 'distributor@example.com', password, role: UserRole.DISTRIBUTOR });
  const retailer = userRepo.create({ name: 'Retailer1', email: 'retailer@example.com', password, role: UserRole.RETAILER });
  const consumer = userRepo.create({ name: 'Consumer1', email: 'consumer@example.com', password, role: UserRole.CONSUMER });

  await userRepo.save([producer, transporter, entrepot, distributor, retailer, consumer]);

  const product = productRepo.create({ name: 'Product A', batchNumber: 'BATCH001', producer, currentStatus: 'Produced', currentLocation: 'Factory' });
  await productRepo.save(product);

  const event = eventRepo.create({ product, actor: producer, status: 'Produced', location: 'Factory', notes: 'Initial creation' });
  await eventRepo.save(event);

  console.log('✅ Seeding completed');
  process.exit();
}

seed();
