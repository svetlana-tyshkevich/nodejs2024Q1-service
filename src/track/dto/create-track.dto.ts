import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  duration: number;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;
}
