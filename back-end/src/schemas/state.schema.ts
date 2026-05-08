import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StateDocument = State & Document;

@Schema({
  collection: 'states',
  versionKey: false,
})
export class State {
  @Prop({
    required: true,
  })
  stateId!: number;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
  })
  active!: boolean;
}

export const StateSchema = SchemaFactory.createForClass(State);
