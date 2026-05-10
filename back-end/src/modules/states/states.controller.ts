import {
  ApiKeyGuard,
  ApiKeyGuardExample,
  ApiResponse,
} from '@monitora-hidro/shared';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { StateDto } from './dto/response-state.dto';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @Get()
  public findAll(): Promise<ApiResponse<StateDto[] | null>> {
    return this.statesService.findAll();
  }
}
