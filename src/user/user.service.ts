import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './models/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './models/dto/sign-up.dto';
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getUserById(id: string) {
    if (!id) throw new BadRequestException('User id is required!');

    return this.findOneUser({ where: { id } });
  }

  async getUserByEmail(email: string) {
    if (!email) return;

    return this.findOneUser({ where: { email }});
  }

  async createUser(dto: CreateUserDto) {
    return await this.repo.save(this.repo.create(dto));
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    if (!user) {
      return;
    }
    await this.repo.delete(id);
  }

  private async findOneUser(options: FindOneOptions<User>) {
    const user = await this.repo.findOne(options);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
