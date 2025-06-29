export * from './jwt-payload.interface'
export * from './role.enum'

export interface ConditionFilters {
  page?: number
  limit?: number
  relations?: object
  where?: object
  select?: object
}
