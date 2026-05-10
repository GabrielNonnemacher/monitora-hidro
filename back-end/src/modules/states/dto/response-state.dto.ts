import { IsBoolean, IsString } from 'class-validator';

export class StateDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsBoolean()
  active!: boolean;
}
