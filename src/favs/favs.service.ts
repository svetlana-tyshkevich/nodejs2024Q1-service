import { Injectable } from '@nestjs/common';
import { albumDB, artistDB, favsDB, trackDB } from '../db';
import { IFavoritesResponse } from './interfaces/favsResponse.interface';
import { ITrack } from '../track/interfaces/track.interface';
import { IAlbum } from '../album/interfaces/album.interface';
import { IArtist } from '../artist/interfaces/artist.interface';

@Injectable()
export class FavsService {
  findAll(): IFavoritesResponse {
    return favsDB;
  }

  addTrack(id: string): ITrack {
    const track = trackDB.find((track) => track.id === id);
    if (track) {
      favsDB.tracks.push(track);
      return track;
    } else {
      return undefined;
    }
  }

  removeTrack(id: string) {
    const trackIndex = favsDB.tracks.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      favsDB.tracks.splice(trackIndex, 1);
      return true;
    }
    return false;
  }

  addAlbum(id: string): IAlbum {
    const album = albumDB.find((album) => album.id === id);
    if (album) {
      favsDB.albums.push(album);
      return album;
    } else {
      return undefined;
    }
  }

  removeAlbum(id: string) {
    const albumIndex = favsDB.albums.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      favsDB.albums.splice(albumIndex, 1);
      return true;
    }
    return false;
  }

  addArtist(id: string): IArtist {
    const artist = artistDB.find((artist) => artist.id === id);
    if (artist) {
      favsDB.artists.push(artist);
      return artist;
    } else {
      return undefined;
    }
  }

  removeArtist(id: string) {
    const artistIndex = favsDB.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      favsDB.artists.splice(artistIndex, 1);
      console.log(favsDB.artists);
      return true;
    }
    return false;
  }
}
