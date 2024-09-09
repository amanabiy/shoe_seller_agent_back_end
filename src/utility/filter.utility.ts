import { In, MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export type EnumFilter<T> = {
  exact?: T;
  in?: T[];
};

export type NumberRangeFilter = {
  gt?: number;
  lt?: number;
  gte?: number;
  lte?: number;
};

export function buildRangeFilter(field: string, value?: NumberRangeFilter) {
  const filter: any = {};
  if (value) {
    if (value.gt !== undefined) filter[field] = MoreThan(value.gt);
    if (value.lt !== undefined) filter[field] = LessThan(value.lt);
    if (value.gte !== undefined) filter[field] = MoreThanOrEqual(value.gte);
    if (value.lte !== undefined) filter[field] = LessThanOrEqual(value.lte);
  }
  return filter;
}


export function applyEnumFilter(query: any, field: string, filter: EnumFilter<any>) {
  if (filter.exact !== undefined) {
    query[field] = filter.exact;
  }
  if (filter.in !== undefined) {
    query[field] = In(filter.in);
  }
}
