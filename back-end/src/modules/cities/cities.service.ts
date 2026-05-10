import { City } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { CityDto } from './dto/response-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name)
    private cityModel: Model<City>,
  ) {}

  public async findAllByStateId(
    stateId: string,
  ): Promise<ApiResponse<CityDto[] | null>> {
    const cities = await this.cityModel.find({ stateId });

    return {
      success: true,
      data: cities ?? null,
      message: cities ? undefined : 'Nenhuma cidade encontrada',
    };
  }
}
