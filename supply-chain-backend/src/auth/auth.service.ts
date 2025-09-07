import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async register(userData: { name: string; email: string; password: string; role: string }) {
    const hashed = await bcrypt.hash(userData.password, 10);

    // ✅ cast role to UserRole
    const user = this.userRepo.create({ 
      ...userData, 
      password: hashed, 
      role: userData.role as UserRole 
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
