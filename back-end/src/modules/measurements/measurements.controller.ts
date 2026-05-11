import {
  ApiKeyGuard,
  ApiKeyGuardExample,
  ApiResponse,
  HmacApiKeyHeader,
  HmacGuard,
  HmacSignatureHeader,
  HmacTimestampHeader,
} from '@monitora-hidro/shared';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { MeasurementDto } from './dto/response-measurement.dto';
import { MeasurementsService } from './measurements.service';

@ApiTags('measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @Get(':locationId/last')
  public async findLastMeasurement(
    @Param('locationId') locationId: string,
  ): Promise<ApiResponse<MeasurementDto | null>> {
    return this.measurementsService.findLastMeasurement(locationId);
  }

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @Get(':locationId/dashboard')
  public async findAllMeasurements(
    @Param('locationId') locationId: string,
  ): Promise<ApiResponse<MeasurementDto[] | null>> {
    return this.measurementsService.findAllMeasurements(locationId);
  }

  @UseGuards(HmacGuard)
  @ApiHeader(HmacApiKeyHeader)
  @ApiHeader(HmacTimestampHeader)
  @ApiHeader(HmacSignatureHeader)
  @Post()
  public create(
    @Body() body: CreateMeasurementDto,
  ): Promise<ApiResponse<MeasurementDto | null>> {
    return this.measurementsService.create(body);
  }
}
