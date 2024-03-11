import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  ValidationPipe,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { trackDB } from '../db';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findOne(id);
    if (artist) return artist;
    else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateArtistDto: CreateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = this.artistService.remove(id);
    if (isDeleted) {
      trackDB.forEach((track) => {
        if (track.artistId === id) track.artistId = null;
      });
      return {};
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
