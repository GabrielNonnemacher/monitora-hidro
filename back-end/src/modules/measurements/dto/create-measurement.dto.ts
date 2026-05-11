import { ApiPropertyExamples, LocationIdExample } from '@monitora-hidro/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMeasurementDto {
  @ApiProperty(ApiPropertyExamples.Date)
  @IsDateString()
  date!: Date;

  @ApiProperty(ApiPropertyExamples.Number)
  @IsNumber()
  measurement!: number;

  @ApiProperty(LocationIdExample)
  @IsString()
  locationId!: string;
}
