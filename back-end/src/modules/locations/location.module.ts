import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './location.controller';
import {
  MonitoringLocation,
  MonitoringLocationSchema,
} from './location.schema';
import { LocationsService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MonitoringLocation.name,
        schema: MonitoringLocationSchema,
      },
    ]),
  ],
  providers: [LocationsService],
  exports: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
