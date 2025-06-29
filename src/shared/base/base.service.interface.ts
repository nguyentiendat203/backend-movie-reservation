import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ConditionFilters } from '~/common/types'
import { FindAllResponse } from '~/shared/base/base.repository.interface'

export interface IBaseService<T> {
  findAll(filter?: ConditionFilters): Promise<FindAllResponse<T>>
  findOneById(id: string): Promise<T | null>
  findOneByCondition(condition: Record<string, any>): Promise<T | null>

  create(data: DeepPartial<T>): Promise<T>
  update(id: string, data: QueryDeepPartialEntity<T>): Promise<boolean>
  softRemove(id: string): Promise<boolean>
}
