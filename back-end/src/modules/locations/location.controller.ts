import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { LocationsService } from './location.service';
import { CreateLocationDto } from './models/create';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() body: CreateLocationDto) {
    return this.locationsService.create(body);
  }

  @Get()
  async findAll() {
    return this.locationsService.findAll();
  }

  @Get(':locationId')
  async findOne(@Param('locationId') locationId: number) {
    return this.locationsService.findOne(locationId);
  }
}
