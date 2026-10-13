import { IScrapedJob } from '../scraped/scrapedJob';

export function getMockJobs(query: string, location: string): IScrapedJob[] {
  return [
    {
      source: 'mock',
      externalId: `job-${query}-${location}-001`,
      title: `${query} Developer`,
      company: 'Example Tech',
      location: 'Almaty',
      url: 'https://example.com/jobs/1',
    },
    {
      source: 'mock',
      externalId: `job-${query}-${location}-002`,
      title: `Senior ${query} Engineer`,
      company: 'Demo Company',
      location: 'Remote',
      url: 'https://example.com/jobs/2',
    },
  ];
}
