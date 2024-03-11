import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResponceInterceptor } from './interseptors/remove-password.interseptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: APP_INTERCEPTOR, useClass: UserResponceInterceptor },
  ],
})

export class UserModule {
}
