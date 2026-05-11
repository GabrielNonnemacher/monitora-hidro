import { ApiPropertyExamples } from '@monitora-hidro/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class MeasurementDto {
  @ApiProperty(ApiPropertyExamples.Date)
  @IsDateString()
  date!: Date;

  @ApiProperty(ApiPropertyExamples.Number)
  @IsNumber()
  measurement!: number;
}
