import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCityDto {
  @IsNumber()
  stateId!: number;

  @IsString()
  name!: string;

  @IsBoolean()
  active!: boolean;
}
