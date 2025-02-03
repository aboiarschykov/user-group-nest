import {
  Body,
  Controller, DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserDto } from './models/dto/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @Serialize(UserDto)
  getUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeGroups', new DefaultValuePipe(false), ParseBoolPipe) includeGroups: boolean
  ) {
    return this.userService.getUserById(id, includeGroups);
  }

  @Post()
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
