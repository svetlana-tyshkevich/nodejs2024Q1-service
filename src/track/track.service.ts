import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { favsDB, trackDB } from '../db';
import { ITrack } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const newTrack = { id, ...createTrackDto };
    trackDB.push(newTrack);
    return newTrack;
  }

  findAll(): ITrack[] {
    return trackDB;
  }

  findOne(id: string): ITrack | undefined {
    return trackDB.find((user) => user.id === id);
  }

  update(id: string, updateTrackDto: CreateTrackDto) {
    const track = trackDB.find((user) => user.id === id);
    if (track) {
      track.name = updateTrackDto.name;
      track.duration = updateTrackDto.duration;
      track.artistId = updateTrackDto.artistId;
      track.albumId = updateTrackDto.albumId;
      return track;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const trackIndex = trackDB.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      trackDB.splice(trackIndex, 1);
      const trackFavsIndex = favsDB.tracks.findIndex(
        (track) => track.id === id,
      );
      if (trackFavsIndex >= 0) {
        favsDB.tracks.splice(trackFavsIndex, 1);
      }
      return true;
    }
    return false;
  }
}
