import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@app/orm';
import { SimpleObject } from '@app/entities';
import { CreateObjectDto } from './dto';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(SimpleObject)
    private objectRepo: Repository<SimpleObject>,
  ) {}

  getLatest(key: string, before: number = Date.now()) {}

  async create(dto: CreateObjectDto) {
    const payload = Object.entries(dto)[0];
    if (payload === undefined) {
      return {};
    }

    const [key, value] = payload;
    const obj = await this.objectRepo.save({
      key,
      value,
    });

    return {
      key: obj.key,
      value: obj.value,
      timestamp: obj.createdAt.getTime(),
    };
  }
}
