export interface DatabaseI<T> {
  getDb(): T;
  close(): void | Promise<void>;
  transaction<R>(callback: () => Promise<R> | R): Promise<R>;
  prepare?(query: string): any; // Optional, for SQLite-like APIs
}
