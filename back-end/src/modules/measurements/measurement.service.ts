import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ApiResponse } from '../shared/models/response';
import { Measurement } from './measurement.schema';
import { CreateMeasurementDto } from './models/create';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(Measurement.name)
    private measurementModel: Model<Measurement>,
  ) {}

  async create(data: CreateMeasurementDto): Promise<ApiResponse<Measurement>> {
    const measurement = await this.measurementModel.create(data);

    return {
      success: true,
      data: measurement,
    };
  }

  async findAll(): Promise<ApiResponse<Measurement[]>> {
    const measurements = await this.measurementModel.find().sort({
      id: -1,
    });

    return {
      success: true,
      data: measurements,
    };
  }
}
