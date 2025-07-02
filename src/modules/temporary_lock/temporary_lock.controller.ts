import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
import { TemporaryLockService } from './temporary_lock.service'
import { CreateTemporaryLockDto } from './dto/create-temporary_lock.dto'
import { UpdateTemporaryLockDto } from './dto/update-temporary_lock.dto'

@Controller('temporary-lock')
export class TemporaryLockController {
  constructor(private readonly temporaryLockService: TemporaryLockService) {}

  @Post()
  create(@Body() createTemporaryLockDto: CreateTemporaryLockDto) {
    return this.temporaryLockService.create(createTemporaryLockDto)
  }

  @Get()
  findAll() {
    return this.temporaryLockService.findAll()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemporaryLockDto: UpdateTemporaryLockDto) {
    return this.temporaryLockService.update(id, updateTemporaryLockDto)
  }
}
