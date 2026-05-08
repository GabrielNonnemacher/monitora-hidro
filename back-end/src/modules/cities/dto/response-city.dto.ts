import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CityDto {
  @IsNumber()
  stateId!: number;

  @IsString()
  name!: string;

  @IsBoolean()
  active!: boolean;
}
