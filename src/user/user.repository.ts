import { UserEntity } from './models/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private readonly storage = new Map<number, UserEntity>();

  async getUser(id: number): Promise<UserEntity> {
    return this.storage.get(id);
  }
}
