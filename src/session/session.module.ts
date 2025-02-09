import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './models/session.entity';
import { SessionService } from './session.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/models/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, User]), UserModule],
  providers: [SessionService, UserService],
})
export class SessionModule {}
