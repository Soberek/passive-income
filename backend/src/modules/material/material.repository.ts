import type {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../../types/index.type";
import { Material } from "../../../../shared/types";
import SqliteDbService from "../../database/sqlite_db.service";

export class MaterialRepository
  implements
    CreatableIRepositoryI<Material, "materialId">,
    ReadableRepositoryI<Material, "materialId">,
    UpdatableRepositoryI<Material, "materialId">,
    DeletableRepositoryI<Material, "materialId">
{
  private db: SqliteDbService;

  constructor(db: SqliteDbService) {
    this.db = db;
  }

  add = (entity: Partial<Material>): number | null => {
    const { name, type, description } = entity;
    const stmt = this.db.getDb().prepare(`
            INSERT INTO material (name, type, description)
            VALUES (?, ?, ?)
        `);
    const result = stmt.run(name, type, description);
    if (result.changes > 0) {
      return Number(result.lastInsertRowid);
    }
    return null;
  };

  getAll = (): Material[] | [] => {
    const stmt = this.db.getDb().prepare(`
                SELECT material_id as materialId, name, type, description FROM material
            `);

    if (!stmt || !stmt.all) {
      console.error("Failed to getDb().prepare statement or execute query");
      return [];
    }

    const result = (stmt.all() as Material[]) || [];
    if (!result || result.length === 0) {
      console.error("Failed to execute query or no results found");
      return [];
    }
    return result;
  };

  getById = (id: Material["materialId"]): Material | null => {
    const stmt = this.db.getDb().prepare(`
            SELECT material_id as materialId, name, type, description FROM material WHERE material_id = ?
        `);
    const result = stmt.get(id) as Material | undefined;
    if (!result) {
      console.error(`Failed to execute query or no results found for id: ${id}`);
      return null;
    }
    return result;
  };

  delete = (id: Material["materialId"]): boolean => {
    const stmt = this.db.getDb().prepare(`
                DELETE FROM material WHERE material_id = ?
            `);
    const result = stmt.run(id);
    return result.changes > 0;
  };

  update = (id: Material["materialId"], entity: Partial<Material>): boolean => {
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

    const stmt = this.db.getDb().prepare(`
                UPDATE material SET ${fieldsToUpdate.join(", ")} WHERE material_id = ?
            `);
    values.push(id);

    const result = stmt.run(...values);
    return result.changes > 0;
  };

  getByType = (type: Material["type"]): Material[] | [] => {
    const stmt = this.db.getDb().prepare(`
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
