import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SEARCH_STATUS } from '../../../../../libs/shared/src/types/search';

export type SearchDocument = HydratedDocument<Search>;
@Schema()
export class Search {
  @Prop({ required: true })
  query: string;

  @Prop({ required: true })
  location: string;

  @Prop({ type: String, enum: SEARCH_STATUS, required: true })
  status: SEARCH_STATUS;

  @Prop({ required: true })
  jobsFound: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  finishedAt: Date;
}

export const SearchSchema = SchemaFactory.createForClass(Search);
