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
import { ChartMeasurementDataDto } from './dto/response-chart-measurement.dto';
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
  @Get(':locationId/dashboard/:filter')
  public async getChartData(
    @Param('locationId') locationId: string,
    @Param('filter') filter: string,
  ): Promise<ApiResponse<ChartMeasurementDataDto[] | null>> {
    return this.measurementsService.getChartData(locationId, filter);
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
