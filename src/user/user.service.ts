import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './models/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpRequestDto } from './models/dto/signup-request.dto';
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getUserById(id: string) {
    if (!id) return ;

    return this.repo.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    if (!email) return;

    return this.repo.findOne({ where: { email }});
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.getUserByEmail(dto.email);
    if (user) {
      throw new BadRequestException(`User with email ${dto.email} already exists`)
    }
    return await this.repo.save(this.repo.create(dto));
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    if (!user) {
      return;
    }
    await this.repo.delete(id);
  }
}
