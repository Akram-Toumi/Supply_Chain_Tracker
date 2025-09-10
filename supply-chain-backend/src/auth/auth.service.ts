import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly jwt: JwtService,
  ) {}

  async register(userData: { name: string; email: string; password: string; role: string }) {
    const hashed = await bcrypt.hash(userData.password, 10);

    const role = await this.roleRepo.findOne({ where: { name: userData.role } });
    if (!role) throw new NotFoundException(`Role with name ${userData.role} not found`);

    const user = this.userRepo.create({
      username: userData.name,
      email: userData.email,
      password: hashed,
      role,
    });

    await this.userRepo.save(user);

    const token = this.jwt.sign({ id: user.id, role: user.role, email: user.email });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwt.sign({ id: user.id, role: user.role, email: user.email });
    return { user, token };
  }
}
