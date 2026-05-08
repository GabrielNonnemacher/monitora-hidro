import { Measurement } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

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
