import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './data-source/data-source';
import { SessionModule } from './session/session.module';



@Module({
  imports: [
    UserModule,
    SessionModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions)],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
