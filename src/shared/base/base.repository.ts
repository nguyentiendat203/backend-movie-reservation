import { FindOptionsWhere, Repository } from 'typeorm'
import { FindAllResponse, IBaseRepository } from './base.repository.interface'
import { BaseEntity } from '~/shared/base/base.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(page?: number, limit?: number): Promise<FindAllResponse<T>> {
    if (page && limit) {
      const offset = (page - 1) * limit
      const [items, count] = await this.repository.findAndCount({
        skip: offset,
        take: limit
      })
      return {
        totalPages: Math.ceil(count / limit),
        count,
        items
      }
    }
    const [items, count] = await this.repository.findAndCount()
    return {
      count,
      items
    }
  }

  async findOneById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>)
  }

  async findOneByCondition(condition: Record<string, any>): Promise<T | null> {
    return await this.repository.findOneBy(condition)
  }

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data)
    return this.repository.save(entity)
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data)
    const updated = await this.findOneById(id)
    if (!updated) throw new Error('Entity not found after update')
    return updated
  }

  async softRemove(id: string): Promise<void> {
    const entity = await this.findOneById(id)
    if (!entity) throw new Error('Entity not found')
    await this.repository.softRemove(entity) // Soft Remove (It need provided @DeleteDateColumn in Entity)
  }
}
