import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class LocationPointDto {
  @IsNumber()
  cityId!: number;

  @IsString()
  name!: string;

  @IsNumber()
  default!: number;

  @IsNumber()
  attention!: number;

  @IsNumber()
  flood!: number;

  @IsNumber()
  extreme!: number;

  @IsBoolean()
  active!: boolean;
}
