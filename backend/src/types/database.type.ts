export interface DatabaseI<T> {
  getDb: () => T;
  close: () => void;
  transaction: <U>(callback: () => U) => U;
}
