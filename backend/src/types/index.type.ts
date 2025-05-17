export interface RepositoryI<T, idKey extends keyof T, idType = number | BigInt> {
  getAll: () => T[];
  getById: (id: idType) => T | null;
  add: (entity: Omit<T, idKey>) => idType | null;
  delete: (id: idType) => boolean;
  update: (id: idType, entity: Partial<T>) => boolean;
}

export interface ServiceI<T, idKey extends keyof T, idType = number | BigInt> {
  getAll: () => T[];
  getById: (id: idType) => T | null;
  add: (entity: Omit<T, idKey>) => idType | null;
  delete: (id: idType) => boolean;
  update: (id: idType, entity: Partial<T>) => boolean;
}
