import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AppTestingModule } from '@app/app-testing.module';
import { ApiTestingModule } from '@app/api/api-testing.module';
import { ObjectService } from './object.service';

describe('ObjectService', () => {
  let service: ObjectService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, ApiTestingModule],
    }).compile();

    service = module.get<ObjectService>(ObjectService);
    connection = module.get<Connection>(Connection);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should have timestamp', async () => {
      const expectedKey = 'key1';
      const expectedValue = 'value1';
      const result = await service.create({ [expectedKey]: expectedValue });
      expect(result.key).toBe(expectedKey);
      expect(result.value).toBe(expectedValue);
      expect(result.timestamp).toBeTruthy();
    });

    it('should return empty object with empty input', async () => {
      const result = await service.create({});
      expect(result).toStrictEqual({});
    });
  });

  describe('getLatest', () => {
    it('should return empty', async () => {
      const result = await service.getLatest('key1');
      expect(result).toStrictEqual({});
    });

    it('should return latest value', async () => {
      const key = 'key1';
      const expectedValue = 'value2';
      await service.create({ [key]: 'value1' });
      await service.create({ [key]: expectedValue });

      const result = await service.getLatest(key);
      expect(result).toStrictEqual({
        value: expectedValue,
      });
    });

    it('should return latest value before a timestamp', async () => {
      const key = 'key1';
      const expectedValue = 'value1';

      const { timestamp } = await service.create({ [key]: expectedValue });
      await new Promise((resolve) => setTimeout(resolve, 500));
      await service.create({ [key]: 'value2' });

      const result = await service.getLatest(key, timestamp + 1);
      expect(result).toStrictEqual({
        value: expectedValue,
      });
    });
  });
});
