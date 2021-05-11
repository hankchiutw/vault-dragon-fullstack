import { Test, TestingModule } from '@nestjs/testing';
import { AppTestingModule } from '@app/app-testing.module';
import { ApiTestingModule } from '@app/api/api-testing.module';
import { ObjectService } from './object.service';

describe('ObjectService', () => {
  let service: ObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, ApiTestingModule],
    }).compile();

    service = module.get<ObjectService>(ObjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
