import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { albumDB, favsDB, trackDB } from '../db';
import { IAlbum } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const newAlbum = { id, ...createAlbumDto };
    albumDB.push(newAlbum);
    return newAlbum;
  }

  findAll(): IAlbum[] {
    return albumDB;
  }

  findOne(id: string): IAlbum | undefined {
    return albumDB.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: CreateAlbumDto) {
    const album = albumDB.find((album) => album.id === id);
    if (album) {
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = updateAlbumDto.artistId;
      return album;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const albumIndex = albumDB.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      albumDB.splice(albumIndex, 1);
      trackDB.forEach((track) => {
        if (track.albumId === id) track.albumId = null;
      });
      const albumFavsIndex = favsDB.albums.findIndex(
        (album) => album.id === id,
      );
      if (albumFavsIndex >= 0) {
        favsDB.albums.splice(albumFavsIndex, 1);
      }
      return true;
    }
    return false;
  }
}
