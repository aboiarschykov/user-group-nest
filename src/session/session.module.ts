import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './models/session.entity';
import { SessionService } from './session.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), forwardRef(() => UserModule)],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
