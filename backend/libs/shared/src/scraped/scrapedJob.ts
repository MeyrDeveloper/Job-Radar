import * as cheerio from 'cheerio';
import { ScrapedJobDto } from '../dto/scraped.dto';

export interface IScrapedJob extends ScrapedJobDto {}

export interface IJobSource {
  readonly name: string;

  searchRemoteOk(query: string, location: string): Promise<IScrapedJob[]>;
}

export const parseJobs = (
  html: string,
  baseUrl: string,
  source: string,
): IScrapedJob[] => {
  const $ = cheerio.load(html);
  const jobs: IScrapedJob[] = [];

  $('.vacancy-card').each((_, element) => {
    const card = $(element);
    const link = card.find('.vacancy-title a').first();
    const href = link.attr('href');
    const title = link.text().trim();

    if (!href || !title) return;

    jobs.push({
      source,
      externalId: card.attr('data-id') ?? href,
      title,
      company: card.find('.vacancy-company').text().trim(),
      location: card.find('.vacancy-location').text().trim(),
      url: new URL(href, baseUrl).toString(),
    });
  });

  return jobs;
};
