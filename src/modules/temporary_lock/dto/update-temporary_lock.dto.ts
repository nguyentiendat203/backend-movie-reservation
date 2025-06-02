import { PartialType } from '@nestjs/mapped-types';
import { CreateTemporaryLockDto } from './create-temporary_lock.dto';

export class UpdateTemporaryLockDto extends PartialType(CreateTemporaryLockDto) {}
