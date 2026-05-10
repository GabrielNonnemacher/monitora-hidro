import {
  ApiKeyGuard,
  ApiKeyGuardExample,
  ApiResponse,
} from '@monitora-hidro/shared';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { LocationPointDto } from './dto/response-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @Get(':cityId')
  async findOne(
    @Param('cityId') cityId: string,
  ): Promise<ApiResponse<LocationPointDto[] | null>> {
    return this.locationsService.findAllByCityId(cityId);
  }
}
