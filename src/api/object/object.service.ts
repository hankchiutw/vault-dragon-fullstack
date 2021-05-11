import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@app/orm';
import { SimpleObject } from '@app/entities';
import { LessThanOrEqual } from 'typeorm';
import { CreateObjectDto } from './dto';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(SimpleObject)
    private objectRepo: Repository<SimpleObject>,
  ) {}

  async getLatest(key: string, before: number) {
    if (!before) {
      before = Date.now();
    }
    const obj = await this.objectRepo.findOne({
      where: {
        createdAt: LessThanOrEqual(timestampToDBDate(before)),
        key,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      value: obj.value,
    };
  }

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

function timestampToDBDate(timestamp: number) {
  const isoString = new Date(timestamp).toISOString();
  return isoString.replace('T', ' ');
}
