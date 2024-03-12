import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsNotEmpty()
  newPassword: string; // new password
}
