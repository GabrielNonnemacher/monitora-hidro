import { LocationPoint } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationPointDto } from './dto/response-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(LocationPoint.name)
    private locationModel: Model<LocationPoint>,
  ) {}

  public async findAllByCityId(
    cityId: string,
  ): Promise<ApiResponse<LocationPointDto[] | null>> {
    const location = await this.locationModel.find({ cityId });
    const hasLocations = location?.length > 0;

    return {
      success: !!location,
      data: hasLocations ? location : null,
      message: hasLocations ? undefined : 'Localização não encontrada',
    };
  }
}
