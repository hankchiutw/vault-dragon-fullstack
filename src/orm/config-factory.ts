import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { SimpleObject } from '@app/entities';

export const configFactory = (
  configService: ConfigService,
): ConnectionOptions => ({
  type: 'sqlite',
  database: configService.get('SQLITE_DB'),
  entities: [SimpleObject],
  logging: true,
  synchronize: true,
});
