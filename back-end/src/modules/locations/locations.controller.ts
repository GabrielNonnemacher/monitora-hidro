import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { ApiKeyGuard, ApiKeyGuardExample } from '@monitora-hidro/shared';
import { CreateLocationPointDtoExample } from './examples/create-location.example';
import { CreateLocationPointDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @ApiBody(CreateLocationPointDtoExample)
  @Post()
  async create(@Body() body: CreateLocationPointDto) {
    return this.locationsService.create(body);
  }

  @Get()
  async findAll() {
    return this.locationsService.findAll();
  }

  @Get(':cityId')
  async findOne(@Param('cityId') cityId: number) {
    return this.locationsService.findOne(cityId);
  }
}
