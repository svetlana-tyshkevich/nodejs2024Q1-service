import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { userDB } from '../db';
import { IUser } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const date = Date.now();
    const { login, password } = createUserDto;
    const newUser = {
      id,
      login,
      password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    userDB.push(newUser);
    return newUser;
  }

  findAll(): IUser[] {
    return userDB;
  }

  findOne(id: string): IUser | undefined {
    return userDB.find((user) => user.id === id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = userDB.find((user) => user.id === id);
    if (user) {
      if (user.password === updatePasswordDto.oldPassword) {
        user.password = updatePasswordDto.newPassword;
        user.updatedAt = Date.now();
        user.version += 1;
        return user;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const userIndex = userDB.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      userDB.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
