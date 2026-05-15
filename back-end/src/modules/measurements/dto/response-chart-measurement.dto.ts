import { ApiPropertyExamples } from '@monitora-hidro/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ChartMeasurementDataDto {
  @ApiProperty(ApiPropertyExamples.String)
  @IsString()
  x!: Date;

  @ApiProperty(ApiPropertyExamples.Number)
  @IsNumber()
  measurement!: number;
}
