import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { artistDB, trackDB } from '../db';
import { IArtist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const newArtist = {id, ...createArtistDto};
    artistDB.push(newArtist);
    return newArtist;
  }

  findAll(): IArtist[] {
    return artistDB;
  }

  findOne(id: string): IArtist | undefined {
    return artistDB.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: CreateArtistDto) {
    const artist = artistDB.find((artist) => artist.id === id);
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return artist;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const artistIndex = artistDB.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      artistDB.splice(artistIndex, 1);
      trackDB.forEach((track) => {
        if (track.artistId === id) track.artistId = null;
      });
      return true;
    }
    return false;
  }
}
