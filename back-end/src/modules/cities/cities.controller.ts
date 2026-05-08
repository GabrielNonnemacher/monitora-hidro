import { ApiKeyGuard, ApiKeyGuardExample } from '@monitora-hidro/shared';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ApiHeader } from '@nestjs/swagger/dist/decorators/api-header.decorator';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateCityDtoExample } from './examples/create-city.example';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @ApiBody(CreateCityDtoExample)
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }
}
