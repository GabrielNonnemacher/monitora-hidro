import { Measurement } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
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

  public async findAllMeasurements(
    locationId: string,
  ): Promise<ApiResponse<MeasurementDto[] | null>> {
    const measurements = await this.measurementModel?.find({ locationId });
    const hasMeasurements = measurements?.length > 0;

    return {
      success: true,
      data: hasMeasurements ? measurements : null,
      message: hasMeasurements
        ? undefined
        : 'Nenhuma medição encontrada para o local especificado',
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
