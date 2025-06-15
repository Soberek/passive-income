export interface DatabaseI<T> {
  getDb(): T;
  close(): void | Promise<void>;
  /** Wykonuje transakcję – sposób wywołania zależy od bazy */
  transaction<T>(callback: () => Promise<T> | T): Promise<T>;
}
