import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  locationId!: number;

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
}
