import { Job } from '@app/database/schemas/job.schema';

export type JobFilterParamsType = Partial<
  Pick<Job, 'company' | 'location' | 'source'>
>;
