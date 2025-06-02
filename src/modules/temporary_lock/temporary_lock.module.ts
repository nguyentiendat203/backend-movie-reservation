import { Module } from '@nestjs/common';
import { TemporaryLockService } from './temporary_lock.service';
import { TemporaryLockController } from './temporary_lock.controller';

@Module({
  controllers: [TemporaryLockController],
  providers: [TemporaryLockService],
})
export class TemporaryLockModule {}
