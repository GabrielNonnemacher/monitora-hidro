import { IsBoolean, IsString } from 'class-validator';

export class StateDto {
  @IsString()
  name!: string;

  @IsBoolean()
  active!: boolean;
}
