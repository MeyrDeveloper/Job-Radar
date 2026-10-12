import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, index: true })
  externalId: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  company: string;

  @Prop()
  location?: string;

  @Prop()
  salaryFrom?: number;

  @Prop()
  salaryTo?: number;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, index: true })
  searchId: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.index({ source: 1, externalId: 1 }, { unique: true });
