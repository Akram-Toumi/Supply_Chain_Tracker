import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Role } from './roles/role.entity';
import { User } from './users/user.entity';

config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Role, User],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const roleRepo = dataSource.getRepository(Role);

  const baseRoles = [
    'PRODUCER',
    'TRANSPORTER',
    'ENTREPOT',
    'DISTRIBUTOR',
    'RETAILER',
    'CONSUMER',
  ];

  for (const name of baseRoles) {
    const exists = await roleRepo.findOne({ where: { name } });
    if (!exists) {
      const role = roleRepo.create({ name });
      await roleRepo.save(role);
      console.log(`✅ Inserted role: ${name}`);
    }
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
