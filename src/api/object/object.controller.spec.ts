import { Test, TestingModule } from '@nestjs/testing';
import { AppTestingModule } from '@app/app-testing.module';
import { ApiTestingModule } from '@app/api/api-testing.module';
import { ObjectController } from './object.controller';

describe('ObjectController', () => {
  let controller: ObjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule, ApiTestingModule],
    }).compile();

    controller = module.get<ObjectController>(ObjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
