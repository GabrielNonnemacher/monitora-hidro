import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type MeasurementDocument = Measurement & Document;

@Schema({
  collection: 'measurements',
  versionKey: false,
})
export class Measurement {
  id!: String;

  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  measurement!: number;

  @Prop({ required: true })
  locationId!: string;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
