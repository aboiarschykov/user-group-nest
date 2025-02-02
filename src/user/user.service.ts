import { UserRepository } from './user.repository';
import { CreateUserDto } from './models/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUser(id: number): Promise<CreateUserDto> {
    return this.userRepository.getUser(id);
  }
}
