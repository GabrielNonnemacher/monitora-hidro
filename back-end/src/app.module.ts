import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import {
  CitiesModule,
  LocationsModule,
  MeasurementsModule,
  StatesModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    CitiesModule,
    LocationsModule,
    MeasurementsModule,
    StatesModule,
  ],
})
export class AppModule {}
