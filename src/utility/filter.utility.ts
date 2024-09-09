import { In, MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';

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
  const filter: any = [];
  if (value) {
    const { gt, lt, gte, lte } = value;

    if (gte !== undefined && lte !== undefined) {
      // Use Between if both gte and lte are defined
      console.log(gte, lte);
      filter.push({size: Between(gte, lte)});
    } else {
      if (value.gt !== undefined) filter.push({ size: MoreThan(value.gt) });
      if (value.lt !== undefined) filter.push({ size: LessThan(value.lt) });
      if (value.gte !== undefined) filter.push({ size: MoreThanOrEqual(value.gte) });
      if (value.lte !== undefined) filter.push({ size: LessThanOrEqual(value.lte) });
    }
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

