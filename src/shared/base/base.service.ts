import { IBaseService } from './base.service.interface'
import { IBaseRepository } from './base.repository.interface'
import { BaseEntity } from '~/shared/base/base.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { DeepPartial } from 'typeorm'

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  findOneById(id: string): Promise<T | null> {
    return this.repository.findOneById(id)
  }

  findOneByCondition(condition: Record<string, any>): Promise<T | null> {
    return this.repository.findOneByCondition(condition)
  }

  findAll(): Promise<T[]> {
    return this.repository.findAll()
  }

  create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data)
  }

  update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    return this.repository.update(id, data)
  }

  softRemove(id: string): Promise<void> {
    return this.repository.softRemove(id)
  }
}
