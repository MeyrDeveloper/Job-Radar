export interface ScrapedJob {
  source: string;
  externalId: string;
  title: string;
  company: string;
  location: string;
  url: string;
}

export function getMockJobs(query: string, location: string): ScrapedJob[] {
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
