import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export interface IBaseRepository<T> {
  findAll(): Promise<T[]>
  findOneById(id: string): Promise<T | null>
  findOneByCondition(condition: Record<string, any>): Promise<T | null>
  create(data: DeepPartial<T>): Promise<T>
  update(id: string, data: QueryDeepPartialEntity<T>): Promise<T>
  softRemove(id: string): Promise<void>
}
