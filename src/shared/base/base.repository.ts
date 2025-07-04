import { DeepPartial, EntityNotFoundError, FindOneOptions, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm'
import { FindAllResponse, IBaseRepository } from './base.repository.interface'
import { BaseEntity } from '~/shared/base/base.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { ConditionFilters } from '~/common/types'
import { NotFoundException } from '@nestjs/common'

export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(conditions = {} as ConditionFilters): Promise<FindAllResponse<T>> {
    const { page, limit } = conditions

    let offset = 0
    if (page && limit) {
      offset = (page - 1) * limit
    }

    const [items, count] = await this.repository.findAndCount({
      ...conditions,
      skip: offset,
      take: limit,
      order: {
        created_at: 'DESC'
      } as FindOptionsOrder<T>
    })
    return {
      totalPages: limit && Math.ceil(count / limit),
      count,
      items
    }
  }

  async findOneById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>)
  }

  async findOneByCondition(condition: FindOneOptions<T>): Promise<T> {
    try {
      return await this.repository.findOneOrFail(condition)
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Data is not found')
      }
      throw error
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data)
    return this.repository.save(entity)
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<boolean> {
    const entity = await this.findOneById(id)
    if (!entity) return false

    return !!(await this.repository.update(id, data))
  }

  async softRemove(id: string): Promise<boolean> {
    const entity = await this.findOneById(id)
    if (!entity) return false
    return !!(await this.repository.softRemove(entity)) // Soft Remove (It need provided @DeleteDateColumn in Entity)
  }
}
