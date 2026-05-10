import { State } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateDto } from './dto/response-state.dto';

@Injectable()
export class StatesService {
  constructor(
    @InjectModel(State.name)
    private locationModel: Model<State>,
  ) {}

  public async findAll(): Promise<ApiResponse<StateDto[] | null>> {
    const locations = await this.locationModel.find();
    return {
      success: true,
      data: locations?.length ? locations : null,
      message: locations?.length ? undefined : 'Nenhum estado encontrado',
    };
  }
}
