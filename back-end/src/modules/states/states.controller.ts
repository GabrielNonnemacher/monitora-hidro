import { ApiKeyGuardExample } from '@monitora-hidro/shared';
import { ApiKeyGuard } from '@monitora-hidro/shared/guards/api-key';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { CreateStateDto } from './dto/create-state.dto';
import { CreateStateDtoExample } from './examples/create-state.example';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @UseGuards(ApiKeyGuard)
  @ApiHeader(ApiKeyGuardExample)
  @ApiBody(CreateStateDtoExample)
  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statesService.findOne(+id);
  }
}
