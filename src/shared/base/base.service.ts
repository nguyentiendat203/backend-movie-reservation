import { IBaseService } from './base.service.interface'
import { FindAllResponse, IBaseRepository } from './base.repository.interface'
import { BaseEntity } from '~/shared/base/base.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { DeepPartial, FindOneOptions, FindOptionsWhere } from 'typeorm'
import { ConditionFilters } from '~/common/types'

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  findOneById(id: string): Promise<T | null> {
    return this.repository.findOneById(id)
  }

  findOneByCondition(condition: FindOneOptions<T>): Promise<T> {
    return this.repository.findOneByCondition(condition)
  }

  findAll(conditionFilter?: ConditionFilters): Promise<FindAllResponse<T>> {
    return this.repository.findAll(conditionFilter)
  }

  create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data)
  }

  update(id: string, data: QueryDeepPartialEntity<T>): Promise<boolean> {
    return this.repository.update(id, data)
  }

  softRemove(id: string): Promise<boolean> {
    return this.repository.softRemove(id)
  }
}
