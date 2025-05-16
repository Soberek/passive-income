export interface RepositoryI<T> {
  getAll: () => T[];
  getById: (id: number) => T | null;
  add: (entity: Partial<T>) => number | BigInt | null;
  delete: (id: number) => boolean;
  update: (id: number, entity: Partial<T>) => boolean;
}
