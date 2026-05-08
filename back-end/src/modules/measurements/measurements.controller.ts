import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { MeasurementsService } from './measurements.service';

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
