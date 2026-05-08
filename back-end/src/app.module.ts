import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { LocationsModule } from './modules/locations/location.module';
import { MeasurementsModule } from './modules/measurements/measurement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!),

    LocationsModule,
    MeasurementsModule,
  ],
})
export class AppModule {}
