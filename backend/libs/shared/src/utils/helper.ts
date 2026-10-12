import * as path from 'path';

export function getEnvPath(appName: string): string {
  const env = process.env.NODE_ENV || 'development';

  return path.join(process.cwd(), 'apps', appName, `.env.${env}`);
}
