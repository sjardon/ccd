import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Person } from 'src/modules/people/entities/person.entity';
import { Period } from './period.entity';

@Schema({ timestamps: true })
export class Event {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }] })
  centralizers: Person[];

  @Prop()
  place: string;

  @Prop()
  time: Period; // Period - DiscretePeriod - RepetiblePeriod

  @Prop()
  tags: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
