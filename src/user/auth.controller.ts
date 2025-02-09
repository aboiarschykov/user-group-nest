import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './models/dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './models/dto/signup-request.dto';
import { SignupResponseDto } from './models/dto/signup-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Serialize(SignupResponseDto)
  async getUser(@Body() dto: SignUpRequestDto) {
    const session = await this.authService.signup(dto);
    return { user: session.user, session };
  }
}
