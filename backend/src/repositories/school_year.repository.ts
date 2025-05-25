import { RepositoryI } from "../types/index.type";
import sqliteDbService from "../services/sqlite_db.service";
import { SchoolYear } from "../../../shared/types";

export class SchoolYearRepository implements RepositoryI<SchoolYear, "schoolYearId"> {
  private db: sqliteDbService;
  constructor(db: sqliteDbService) {
    this.db = db;
  }
  add = (entity: Partial<SchoolYear>): number | null => {
    const { year } = entity;
    const stmt = this.db.prepare(`
            INSERT INTO school_year (year)
            VALUES (?)
        `);
    const result = stmt.run(year);
    if (result.changes > 0) {
      return Number(result.lastInsertRowid);
    }
    return null;
  };
  getAll = (): SchoolYear[] => {
    const stmt = this.db.prepare(`
            SELECT school_year_id as schoolYearId, year FROM school_years
        `);
    const result = (stmt.all() as SchoolYear[]) || [];
    if (!result || result.length === 0) {
      console.error("Failed to execute query or no results found");
      return [];
    }
    return result;
  };
  getById: (id: number) => SchoolYear | null = (id) => {
    const stmt = this.db.prepare(`
            SELECT school_year_id as schoolYearId, year FROM school_years WHERE school_year_id = ?
        `);
    const result = stmt.get(id) as SchoolYear | undefined;
    if (!result) {
      console.error(`Failed to execute query or no results found for id: ${id}`);
      return null;
    }
    return result;
  };
  delete = (id: number): boolean => {
    const stmt = this.db.prepare(`
            DELETE FROM school_years WHERE school_year_id = ?
        `);
    const result = stmt.run(id);
    return result.changes > 0;
  };
  update = (id: number, entity: Partial<SchoolYear>): boolean => {
    const values = [];
    const fieldsToUpdate = [];
    if (entity.year) {
      fieldsToUpdate.push("year = ?");
      values.push(entity.year);
    }
    const stmt = this.db.prepare(`
            UPDATE school_years
            SET ${fieldsToUpdate.join(", ")}
            WHERE school_year_id = ?
        `);
    values.push(id);
    const result = stmt.run(...values);
    if (result.changes > 0) {
      return true;
    }
    return false;
  };
}
