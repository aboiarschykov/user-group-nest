import { UserDto } from './user.dto';
import { SessionDto } from '../../../session/models/session.dto';
import { Expose, Transform, Type } from 'class-transformer';

export class SignupResponseDto {
  //@Transform(({ obj }) => obj.user)
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

 // @Transform(({ obj }) => obj)
  @Type(() => SessionDto)
  @Expose()
  session: SessionDto

}
