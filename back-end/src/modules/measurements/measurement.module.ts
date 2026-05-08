import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementsController } from './measurement.controller';
import { Measurement, MeasurementSchema } from './measurement.schema';
import { MeasurementsService } from './measurement.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Measurement.name,
        schema: MeasurementSchema,
      },
    ]),
  ],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
  controllers: [MeasurementsController],
})
export class MeasurementsModule {}
