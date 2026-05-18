import { Measurement } from '@monitora-hidro/schemas';
import { ApiResponse, FilterChart } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { ChartMeasurementDataDto } from './dto/response-chart-measurement.dto';
import { MeasurementDto } from './dto/response-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(Measurement.name)
    private measurementModel: Model<Measurement>,
  ) {}

  public async findLastMeasurement(
    locationId: string,
  ): Promise<ApiResponse<MeasurementDto | null>> {
    const measurement = await this.measurementModel
      ?.findOne({ locationId })
      ?.sort({ date: -1 })
      ?.exec();

    return {
      success: true,
      data: measurement ? measurement : null,
      message: measurement
        ? undefined
        : 'Medição não encontrada para o local especificado',
    };
  }

  public async getChartData(
    locationId: string,
    filter: string,
  ): Promise<ApiResponse<ChartMeasurementDataDto[] | null>> {
    const now = new Date();
    let startDate = new Date();

    let groupId: any;
    let projectX: any;
    let limit = 0;
    let error = false;

    switch (filter) {
      case FilterChart.years:
        startDate.setFullYear(now.getFullYear() - 5);
        groupId = { $year: '$date' };
        projectX = { $toString: '$_id' };
        limit = 5;
        break;
      case FilterChart.months:
        startDate.setMonth(now.getMonth() - 12);
        groupId = {
          year: { $year: '$date' },
          month: { $month: '$date' },
        };
        projectX = {
          $concat: [
            { $toString: '$_id.month' },
            '/',
            { $toString: '$_id.year' },
          ],
        };
        limit = 12;
        break;
      case FilterChart.days:
        startDate.setDate(now.getDate() - 12);
        groupId = {
          $dateToString: {
            format: '%d/%m/%Y',
            date: '$date',
          },
        };
        projectX = '$_id';
        limit = 12;
        break;
      case FilterChart.today:
        startDate.setHours(now.getHours() - 5);
        groupId = {
          $dateToString: {
            format: '%H:%M',
            date: '$date',
          },
        };
        projectX = '$_id';
        limit = 5;
        break;
      default:
        error = true;
        break;
    }

    const result = await this.measurementModel.aggregate([
      {
        $match: {
          locationId,
          date: {
            $gte: startDate,
            $lte: now,
          },
        },
      },
      {
        $group: {
          _id: groupId,
          measurement: {
            $avg: '$measurement',
          },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          measurement: { $round: ['$measurement', 2] },
          x: projectX,
        },
      },
    ]);

    return {
      success: !error,
      data: result ?? null,
      message: error ? 'Erro no filtro' : undefined,
    };
  }

  public async create(
    createMeasurementDto: CreateMeasurementDto,
  ): Promise<ApiResponse<MeasurementDto | null>> {
    const createdMeasurement = new this.measurementModel(createMeasurementDto);
    await createdMeasurement.save();

    return {
      success: true,
      data: createdMeasurement ?? null,
      message: createdMeasurement
        ? 'Salvo com sucesso'
        : 'Erro ao criar medição',
    };
  }
}
