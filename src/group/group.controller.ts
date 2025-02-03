import { Body, Controller, Post } from '@nestjs/common';
import { CreateGroupDto } from './models/dto/create-group.dto';
import { GroupService } from './group.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GroupDto } from './models/dto/group.dto';

@Controller('group')
export class GroupController {

  constructor(private readonly groupService: GroupService) {
  }

  @Post()
  @Serialize(GroupDto)
  createGroup(@Body() body: CreateGroupDto) {
    return this.groupService.createGroup(body.name);
  }

}
