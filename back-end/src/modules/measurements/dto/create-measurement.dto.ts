import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { ApiPropertyExamples } from '../../../shared/utils/api-property.example';

export class CreateMeasurementDto {
  @ApiProperty(ApiPropertyExamples.Date)
  @IsDateString()
  id!: Date;

  @ApiProperty(ApiPropertyExamples.Number)
  @IsNumber()
  measurement!: number;

  @ApiProperty(ApiPropertyExamples.Number)
  @IsNumber()
  location_id!: number;
}
