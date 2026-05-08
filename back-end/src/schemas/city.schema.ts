import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({
  collection: 'cities',
  versionKey: false,
})
export class City {
  @Prop({ required: true })
  stateId!: number;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  active!: boolean;
}

export const CitySchema = SchemaFactory.createForClass(City);
