import { DataSource } from 'typeorm';
import { Role } from './src/roles/role.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'supplychain.sqlite',
  entities: [Role],
  synchronize: false,
  logging: false,
});

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Database connected for seeding');

    const roleRepo = dataSource.getRepository(Role);

    const baseRoles = [
      'PRODUCER',
      'TRANSPORTER',
      'WAREHOUSE',
      'DISTRIBUTOR',
      'CONSUMER',
    ];

    for (const name of baseRoles) {
      const exists = await roleRepo.findOne({ where: { name } });
      if (!exists) {
        const role = roleRepo.create({ name });
        await roleRepo.save(role);
        console.log(`✅ Inserted role: ${name}`);
      } else {
        console.log(`ℹ️ Role already exists: ${name}`);
      }
    }

    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((err) => {
  console.error('Seed script error:', err);
  process.exit(1);
});
