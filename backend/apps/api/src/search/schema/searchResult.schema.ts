import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SearchResultDocument = HydratedDocument<SearchResult>;

@Schema({
  timestamps: {
    createdAt: 'foundAt',
  },
})
export class SearchResult {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Search', required: true })
  searchId: Types.ObjectId;
}

export const SearchResultSchema = SchemaFactory.createForClass(SearchResult);

SearchResultSchema.index({ searchId: 1, jobId: 1 }, { unique: true });
