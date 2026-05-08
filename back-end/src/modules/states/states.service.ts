import { State } from '@monitora-hidro/schemas';
import { ApiResponse } from '@monitora-hidro/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStateDto } from './dto/create-state.dto';
import { StateDto } from './dto/response-state.dto';

@Injectable()
export class StatesService {
  constructor(
    @InjectModel(State.name)
    private locationModel: Model<State>,
  ) {}

  async create(data: CreateStateDto): Promise<ApiResponse<StateDto>> {
    const state = await this.locationModel.create(data);
    return {
      success: true,
      data: state,
    };
  }

  async findAll(): Promise<ApiResponse<StateDto[]>> {
    const locations = await this.locationModel.find();
    return {
      success: true,
      data: locations,
    };
  }

  async findOne(stateId: number): Promise<ApiResponse<StateDto | null>> {
    const state = await this.locationModel.findOne({ stateId });
    return {
      success: !!state,
      data: state,
      message: state ? undefined : 'Estado não encontrado',
    };
  }
}
