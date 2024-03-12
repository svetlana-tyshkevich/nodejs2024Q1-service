import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @Header('Content-Type', 'application/json')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const isSaved = this.favsService.addTrack(id);
    if (isSaved) {
      return { message: 'Track is added to favorites' };
    } else {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = this.favsService.removeTrack(id);
    if (isDeleted) {
      return { message: 'Track is moved from favorites' };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const isSaved = this.favsService.addAlbum(id);
    if (isSaved) {
      return { message: 'Album is added to favorites' };
    } else {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = this.favsService.removeAlbum(id);
    if (isDeleted) {
      return { message: 'Album is moved from favorites' };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const isSaved = this.favsService.addArtist(id);
    if (isSaved) {
      return { message: 'Artist is added to favorites' };
    } else {
      throw new HttpException(
        'Unprocessable Entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = this.favsService.removeArtist(id);
    if (isDeleted) {
      return { message: 'Artist is moved from favorites' };
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
