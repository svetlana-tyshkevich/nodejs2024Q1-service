import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  Put,
  ValidationPipe,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findOne(id);
    if (album) return album;
    else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = this.albumService.remove(id);
    if (isDeleted) {
      return {};
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
