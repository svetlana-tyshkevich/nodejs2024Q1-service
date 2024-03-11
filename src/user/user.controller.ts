import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res, HttpStatus, ParseUUIDPipe, Header, HttpCode, HttpException, ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @Header('Content-Type', 'application/json')
  create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.findOne(id);
    if (user) return user;
    else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe())
    updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isDeleted = this.userService.remove(id);
    if (isDeleted) {
      return {};
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
