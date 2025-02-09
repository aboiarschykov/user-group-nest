import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './models/dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @Serialize(UserDto)
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
