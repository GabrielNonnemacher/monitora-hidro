import { City } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { CityDto } from './dto/response-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name)
    private locationModel: Model<City>,
  ) {}

  async create(data: CreateCityDto): Promise<ApiResponse<CityDto>> {
    const city = await this.locationModel.create(data);
    return {
      success: true,
      data: city,
    };
  }

  async findAll(): Promise<ApiResponse<CityDto[]>> {
    const locations = await this.locationModel.find();
    return {
      success: true,
      data: locations,
    };
  }

  async findOne(cityId: number): Promise<ApiResponse<CityDto | null>> {
    const city = await this.locationModel.findOne({ cityId });
    return {
      success: !!city,
      data: city,
      message: city ? undefined : 'Cidade não encontrada',
    };
  }
}
