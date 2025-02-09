import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => SessionModule)],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
