import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ApiResponse } from '../shared/models/response';
import { MonitoringLocation } from './location.schema';
import { CreateLocationDto } from './models/create';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(MonitoringLocation.name)
    private locationModel: Model<MonitoringLocation>,
  ) {}

  async create(
    data: CreateLocationDto,
  ): Promise<ApiResponse<MonitoringLocation>> {
    const location = await this.locationModel.create(data);
    return {
      success: true,
      data: location,
    };
  }

  async findAll(): Promise<ApiResponse<MonitoringLocation[]>> {
    const locations = await this.locationModel.find();
    return {
      success: true,
      data: locations,
    };
  }

  async findOne(
    locationId: number,
  ): Promise<ApiResponse<MonitoringLocation | null>> {
    const location = await this.locationModel.findOne({
      locationId,
    });
    return {
      success: !!location,
      data: location,
      message: location ? undefined : 'Localização não encontrada',
    };
  }
}
