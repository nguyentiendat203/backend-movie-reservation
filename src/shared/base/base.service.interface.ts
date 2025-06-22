import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { FindAllResponse } from '~/shared/base/base.repository.interface'

export interface IBaseService<T> {
  findAll(page?: number, limit?: number, queriesFilter?: Record<string, string | number>): Promise<FindAllResponse<T>>
  findOneById(id: string): Promise<T | null>
  findOneByCondition(condition: Record<string, any>): Promise<T | null>

  create(data: DeepPartial<T>): Promise<T>
  update(id: string, data: QueryDeepPartialEntity<T>): Promise<T>
  softRemove(id: string): Promise<void>
}
