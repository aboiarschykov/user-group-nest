import {Body, Controller, Get, NotFoundException, Param, Post} from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './models/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<CreateUserDto> {
    const user: UserEntity = await this.userService.getUser(+id);
    if (!user) {
      throw new NotFoundException('User is not found.');
    }
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
