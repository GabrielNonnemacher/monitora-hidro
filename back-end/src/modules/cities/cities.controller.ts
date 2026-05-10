import {
  ApiKeyGuard,
  ApiKeyGuardExample,
  ApiResponse,
} from '@monitora-hidro/shared';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger/dist/decorators/api-header.decorator';
import { CitiesService } from './cities.service';
import { CityDto } from './dto/response-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @Get(':stateId')
  public findAllByStateId(
    @Param('stateId') stateId: string,
  ): Promise<ApiResponse<CityDto[] | null>> {
    return this.citiesService.findAllByStateId(stateId);
  }
}
