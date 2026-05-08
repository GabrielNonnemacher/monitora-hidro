import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateMeasurementDto {
  @ApiProperty({
    example: '2026-05-07T12:00:00Z',
  })
  @IsDateString()
  id!: Date;

  @ApiProperty({
    example: 3.5,
  })
  @IsNumber()
  measurement!: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  location_id!: number;
}
