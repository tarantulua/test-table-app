import { IFilters } from 'src/types/filtets';

const filtersToQuery = (filters: IFilters): string => {
  let reqStr = '?';
  if (!filters || typeof filters !== 'object' || !Object.keys(filters).length) {
    return reqStr;
  }

  Object.entries(filters).forEach(([key, value]: any, index: number) => {
    if (Object.entries(filters).length - 1 === index) {
      reqStr += `${key}=${value}`;
    } else {
      reqStr += `${key}=${value}&`;
    }
  });

  return reqStr;
};

const compare = (a: number | string, b: number | string, isAsc: boolean) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export { filtersToQuery, compare };



