import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type MeasurementDocument = Measurement & Document;

@Schema({
  collection: 'measurements',
  timestamps: true,
})
export class Measurement {
  @Prop({ required: true })
  id!: Date;

  @Prop({ required: true })
  measurement!: number;

  @Prop({ required: true })
  location_id!: number;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
