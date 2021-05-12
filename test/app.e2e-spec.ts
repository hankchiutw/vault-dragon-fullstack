import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppTestingModule } from '@app/app-testing.module';
import { ApiTestingModule } from '@app/api/api-testing.module';

describe('ObjectController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, ApiTestingModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /object/:key', () => {
    return request(app.getHttpServer()).get('/object/x').expect(200).expect({});
  });

  it('POST /object', async () => {
    const expectedKey = 'key1';
    const expectedValue = 'value1';
    const res = await request(app.getHttpServer())
      .post('/object')
      .send({ [expectedKey]: expectedValue })
      .expect(201);

    const { key, value, timestamp } = res.body;
    expect(key).toBe(expectedKey);
    expect(value).toBe(expectedValue);
    expect(timestamp).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
