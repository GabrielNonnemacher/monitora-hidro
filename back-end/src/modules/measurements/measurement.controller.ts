import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { MeasurementsService } from './measurement.service';
import { CreateMeasurementDto } from './models/create';

@ApiTags('measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  async create(@Body() body: CreateMeasurementDto) {
    return this.measurementsService.create(body);
  }

  @Get()
  async findAll() {
    return this.measurementsService.findAll();
  }
}
