import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './models/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpRequestDto } from './models/dto/signup-request.dto';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SessionService } from './session.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserDto } from './models/dto/user.dto';
import { SessionDto } from './models/session.dto';
import { SignupResponseDto } from './models/dto/signup-response.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private readonly SALT_LENGTH_BYTES = 8;
  private readonly HASH_LENGTH_BYTES = 32;

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async signup(dto: SignUpRequestDto) {
    const salt = randomBytes(this.SALT_LENGTH_BYTES).toString('hex');
    const hash = (await scrypt(
      dto.password,
      salt,
      this.HASH_LENGTH_BYTES,
    )) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');
    const newUser = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return this.sessionService.createSession(newUser.id);
  }
}
