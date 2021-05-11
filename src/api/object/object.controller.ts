import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto';

@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Get(':key')
  findOne(@Param('key') key: string, @Query('timestamp') timestamp: string) {
    return this.objectService.getLatest(key, Number(timestamp));
  }

  @Post()
  create(@Body() dto: CreateObjectDto) {
    return this.objectService.create(dto);
  }
}
