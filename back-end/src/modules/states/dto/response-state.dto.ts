import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class StateDto {
  @IsNumber()
  stateId!: number;

  @IsString()
  name!: string;

  @IsBoolean()
  active!: boolean;
}
