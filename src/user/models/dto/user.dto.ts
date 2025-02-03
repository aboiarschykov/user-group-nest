import { Expose, plainToInstance, Transform } from 'class-transformer';
import { GroupDto } from '../../../group/models/dto/group.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  age: number;

  @Expose()
  @Transform(({ obj }) => plainToInstance(GroupDto, obj.groups))
  groups: GroupDto[];
}
