import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type LocationPointDocument = LocationPoint & Document;

@Schema({
  collection: 'locations',
  versionKey: false,
})
export class LocationPoint {
  @Prop({
    required: true,
  })
  cityId!: string;

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

  @Prop({ required: true })
  active!: boolean;
}

export const LocationPointSchema = SchemaFactory.createForClass(LocationPoint);
