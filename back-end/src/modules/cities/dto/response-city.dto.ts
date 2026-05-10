import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CityDto {
  @IsString()
  id!: string;

  @IsString()
  stateId!: string;

  @IsString()
  name!: string;

  @IsBoolean()
  active!: boolean;
}
