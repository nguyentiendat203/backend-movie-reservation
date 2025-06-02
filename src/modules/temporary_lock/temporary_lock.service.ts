import { Injectable } from '@nestjs/common';
import { CreateTemporaryLockDto } from './dto/create-temporary_lock.dto';
import { UpdateTemporaryLockDto } from './dto/update-temporary_lock.dto';

@Injectable()
export class TemporaryLockService {
  create(createTemporaryLockDto: CreateTemporaryLockDto) {
    return 'This action adds a new temporaryLock';
  }

  findAll() {
    return `This action returns all temporaryLock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} temporaryLock`;
  }

  update(id: number, updateTemporaryLockDto: UpdateTemporaryLockDto) {
    return `This action updates a #${id} temporaryLock`;
  }

  remove(id: number) {
    return `This action removes a #${id} temporaryLock`;
  }
}
