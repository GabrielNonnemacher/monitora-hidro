import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type MonitoringLocationDocument = MonitoringLocation & Document;

@Schema({
  collection: 'locations',
  timestamps: true,
})
export class MonitoringLocation {
  @Prop({
    required: true,
    unique: true,
  })
  locationId!: number;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  default!: number;

  @Prop({ required: true })
  attention!: number;

  @Prop({ required: true })
  flood!: number;

  @Prop({ required: true })
  extreme!: number;
}

export const MonitoringLocationSchema =
  SchemaFactory.createForClass(MonitoringLocation);
