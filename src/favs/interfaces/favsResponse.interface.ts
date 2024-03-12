import { IArtist } from '../../artist/interfaces/artist.interface';
import { IAlbum } from '../../album/interfaces/album.interface';
import { ITrack } from '../../track/interfaces/track.interface';

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
