import { ScrapedJobDto } from '@app/shared/dto/scraped';
import { IJobSource } from '@app/shared/scraped/scrapedJob';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

interface RemoteOkJob {
  id?: number;
  position?: string;
  company?: string;
  location?: string;
  url?: string;
  tags?: string[];
  description?: string;
}

@Injectable()
export class RemoteOkSource implements IJobSource {
  readonly name = 'Remote ok';
  private readonly logger = new Logger(RemoteOkSource.name);

  constructor(private readonly httpService: HttpService) {}

  async searchRemoteOk(
    query: string,
    location: string,
  ): Promise<ScrapedJobDto[]> {
    try {
      const res = await firstValueFrom(
        this.httpService.get('https://remoteok.com/api', {
          headers: {
            'User-Agent': 'JobRadar/1.0',
            Accept: 'application/json',
          },
          signal: AbortSignal.timeout(15_000),
        }),
      );

      const data: string = res.data;
      if (!Array.isArray(data)) {
        throw new Error('Unexpected Remote OK response');
      }

      const jobs = data as RemoteOkJob[];
      const normalizedQuery = query.trim().toLowerCase();
      const normalizedLocation = location.trim().toLowerCase();

      const filteredJobs = jobs
        .filter((job) => job.id && job.position && job.url)
        .filter((job) => {
          const searchableText = [
            job.position,
            job.company,
            ...(job.tags ?? []),
            job.description,
          ]
            .flat()
            .join(' ')
            .toLowerCase();

          const matchesQuery =
            !normalizedQuery ||
            normalizedQuery
              .split(/\s+/)
              .some((word) => searchableText.includes(word));

          const jobLocation = (job.location ?? '').toLowerCase();

          const matchesLocation =
            !normalizedLocation ||
            normalizedLocation === 'remote' ||
            jobLocation.includes(normalizedLocation) ||
            jobLocation.includes('worldwide');

          return matchesQuery && matchesLocation;
        })
        .map((job) => ({
          source: this.name,
          externalId: String(job.id),
          title: job.position!,
          company: job.company ?? 'Unknown',
          location: job.location ?? 'Remote',
          url: job.url!,
        }));

      this.logger.log(filteredJobs);

      return filteredJobs;
    } catch (e) {
      if (e instanceof AxiosError) {
        this.logger.error(`Remote OK returned HTTP ${e.status}`);
        return [];
      }
      return [];
    }
  }
}
