import { RepositoryI } from "../types/index.type";
import { Material } from "../../../shared/types";
import sqliteDbService from "../services/sqliteDbService";

class MaterialRepository implements RepositoryI<Material, "materialId"> {
  private db: sqliteDbService;

  constructor(db: sqliteDbService) {
    this.db = db;
  }

  add = (entity: Partial<Material>): number | BigInt | null => {
    const { name, type, description } = entity;
    const stmt = this.db.prepare(`
            INSERT INTO material (name, type, description)
            VALUES (?, ?, ?)
        `);
    const result = stmt.run(name, type, description);
    if (result.changes > 0) {
      return result.lastInsertRowid;
    }
    return null;
  };

  getAll = (): Material[] => {
    const stmt = this.db.prepare(`
                SELECT material_id as materialId, name, type, description FROM material
            `);

    if (!stmt || !stmt.all) {
      console.error("Failed to prepare statement or execute query");
      return [];
    }

    const result = (stmt.all() as Material[]) || [];
    if (!result || result.length === 0) {
      console.error("Failed to execute query or no results found");
      return [];
    }
    return result;
  };

  getById: (id: number | BigInt) => Material | null = (id) => {
    const stmt = this.db.prepare(`
            SELECT material_id as materialId, name, type, description FROM material WHERE material_id = ?
        `);
    const result = stmt.get(id) as Material | undefined;
    if (!result) {
      console.error(`Failed to execute query or no results found for id: ${id}`);
      return null;
    }
    return result;
  };

  delete = (id: number | BigInt): boolean => {
    const stmt = this.db.prepare(`
                DELETE FROM material WHERE material_id = ?
            `);
    const result = stmt.run(id);
    return result.changes > 0;
  };

  update = (id: number | BigInt, entity: Partial<Material>): boolean => {
    const values = [];
    const fieldsToUpdate = [];

    if (entity.name) {
      fieldsToUpdate.push("name = ?");
      values.push(entity.name);
    }
    if (entity.type) {
      fieldsToUpdate.push("type = ?");
      values.push(entity.type);
    }
    if (entity.description) {
      fieldsToUpdate.push("description = ?");
      values.push(entity.description);
    }

    if (fieldsToUpdate.length === 0) {
      return false; // No fields to update
    }

    const stmt = this.db.prepare(`
                UPDATE material SET ${fieldsToUpdate.join(", ")} WHERE material_id = ?
            `);
    values.push(id);

    const result = stmt.run(...values);
    return result.changes > 0;
  };

  getByType = (type: string): Material[] => {
    const stmt = this.db.prepare(`
            SELECT material_id as materialId, name, type, description FROM material WHERE type = ?
        `);
    const result = stmt.all(type) as Material[] | undefined;
    if (!result || result.length === 0) {
      console.error(`Failed to execute query or no results found for type: ${type}`);
      return [];
    }
    return result;
  };
}
