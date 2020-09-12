import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Acronym extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
    type: String,
  })
  acronym: string;

  @Prop({ required: true })
  definitions: string[];
}

export const AcronymSchema = SchemaFactory.createForClass(Acronym);
AcronymSchema.index({ '$**': 'text' });
