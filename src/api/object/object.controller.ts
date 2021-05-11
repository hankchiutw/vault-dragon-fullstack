import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto';

@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Get(':key')
  findOne(@Param() params) {
    return this.objectService.getLatest(params.key);
  }

  @Post()
  create(@Body() dto: CreateObjectDto) {
    return this.objectService.create(dto);
  }
}
