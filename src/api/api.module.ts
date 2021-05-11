import { Module } from '@nestjs/common';
import { OrmModule } from '@app/orm';
import { SimpleObject } from '@app/entities';
import { ObjectController, ObjectService } from './object';

@Module({
  imports: [OrmModule.forFeature([SimpleObject])],
  controllers: [ObjectController],
  providers: [ObjectService],
})
export class ApiModule {}
