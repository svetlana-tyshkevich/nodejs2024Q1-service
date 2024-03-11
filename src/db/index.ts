import { IUser } from '../user/interfaces/user.interface';
import { ITrack } from '../track/interfaces/track.interface';
import { IArtist } from '../artist/interfaces/artist.interface';
import { IAlbum } from '../album/interfaces/album.interface';
import { IFavoritesResponse } from '../favs/interfaces/favsResponse.interface';

export const userDB: IUser[] = [];
export const trackDB: ITrack[] = [];
export const artistDB: IArtist[] = [];
export const albumDB: IAlbum[] = [];
export const favsDB: IFavoritesResponse = {
  artists: [],
  albums: [],
  tracks: [],
};
