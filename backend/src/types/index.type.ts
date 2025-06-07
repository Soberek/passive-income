export interface RepositoryI<T, idKey extends keyof T, idType = number> {
  getAll: () => T[];
  getById: (id: idType) => T | null;
  add: (entity: Omit<T, idKey>) => idType | null;
  delete: (id: idType) => boolean;
  update: (id: idType, entity: Partial<T>) => boolean;
}

export interface CreatableIRepositoryI<T, idKey extends keyof T, idType = number> {
  add: (entity: Omit<T, idKey>) => idType | null;
}
export interface ReadableRepositoryI<T, idKey extends keyof T, idType = number> {
  getAll: () => T[];
  getById: (id: idType) => T | null;
}

export interface DeletableRepositoryI<T, idKey extends keyof T, idType = number> {
  delete: (id: idType) => boolean;
}

export interface UpdatableRepositoryI<T, idKey extends keyof T, idType = number> {
  update: (id: idType, entity: Partial<T>) => boolean;
}

export interface BulkInsertableRepositoryI<T, idKey extends keyof T, idType = number> {
  bulkInsert: (entities: Omit<T, idKey>[]) => boolean;
}

// bad
export interface ServiceI<T, idKey extends keyof T, idType = number> {
  getAll: () => T[];
  getById: (id: idType) => T | null;
  add: (entity: Omit<T, idKey>) => idType | null;
  delete: (id: idType) => boolean;
  update: (id: idType, entity: Partial<T>) => boolean;
}

// good
export interface CreatableI<T, idKey extends keyof T, idType = number> {
  add: (entity: Omit<T, idKey>) => idType | null;
}

export interface DeletableI<T, idKey extends keyof T, idType = number> {
  delete: (id: idType) => boolean;
}

export interface UpdatableI<T, idKey extends keyof T, idType = number> {
  update: (id: idType, entity: Partial<T>) => boolean;
}

export interface ReadableI<T, idKey extends keyof T, idType = number> {
  getAll: () => T[];
  getById: (id: idType) => T | null;
}
