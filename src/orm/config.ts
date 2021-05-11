import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { SimpleObject } from '@app/entities';

export const rootConfigFactory = (
  configService: ConfigService,
): ConnectionOptions => ({
  type: 'sqlite',
  database: configService.get('SQLITE_DB'),
  entities: [SimpleObject],
  logging: true,
  synchronize: true,
});

export const testConfig: ConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [SimpleObject],
  synchronize: true,
};
