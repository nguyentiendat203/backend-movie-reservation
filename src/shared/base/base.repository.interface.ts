import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ConditionFilters } from '~/common/types'

export type FindAllResponse<T> = { count: number; totalPages?: number; items: T[] }

export interface IBaseRepository<T> {
  findAll(filter?: ConditionFilters): Promise<FindAllResponse<T>>
  findOneById(id: string): Promise<T | null>
  findOneByCondition(condition: Record<string, any>): Promise<T | null>

  create(data: DeepPartial<T>): Promise<T>
  update(id: string, data: QueryDeepPartialEntity<T>): Promise<boolean>
  softRemove(id: string): Promise<boolean>
}
