import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './models/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getUserById(id: number) {
    if (!id) {
      return;
    }

    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    return await this.repo.save(this.repo.create(dto));
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      return;
    }
    await this.repo.delete(id);
  }
}
