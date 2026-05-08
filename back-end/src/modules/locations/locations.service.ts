import { LocationPoint } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationPointDto } from './dto/create-location.dto';
import { LocationPointDto } from './dto/response-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(LocationPoint.name)
    private locationModel: Model<LocationPoint>,
  ) {}

  async create(
    data: CreateLocationPointDto,
  ): Promise<ApiResponse<LocationPointDto>> {
    const location = await this.locationModel.create(data);
    return {
      success: true,
      data: location,
    };
  }

  async findAll(): Promise<ApiResponse<LocationPoint[]>> {
    const locations = await this.locationModel.find();
    return {
      success: true,
      data: locations,
    };
  }

  async findOne(cityId: number): Promise<ApiResponse<LocationPoint | null>> {
    const location = await this.locationModel.findOne({ cityId });
    return {
      success: !!location,
      data: location,
      message: location ? undefined : 'Localização não encontrada',
    };
  }
}
