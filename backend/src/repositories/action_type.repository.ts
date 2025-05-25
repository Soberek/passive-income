import { RepositoryI } from "../types/index.type";
import { ActionType } from "../../../shared/types";
import sqliteDbService from "../services/sqlite_db.service";

export class ActionTypeRepository implements RepositoryI<ActionType, "actionTypeId"> {
  private db: sqliteDbService;
  constructor(sqliteDbService: sqliteDbService) {
    this.db = sqliteDbService;
  }

  add = (entity: Partial<ActionType>): number | null => {
    const stmt = this.db.prepare(`
            INSERT INTO action_types (name)
            VALUES (?);
        `);

    const info = stmt.run(entity.name);

    if (info.lastInsertRowid) {
      return Number(info.lastInsertRowid);
    } else {
      console.error("Error inserting action type");
      return null;
    }
  };
  getAll = (): ActionType[] | [] => {
    const stmt = this.db.prepare(`
            SELECT 
                action_type_id as actionTypeId, 
                name
            FROM action_types
        `);

    const rows = stmt.all();

    if (!rows || rows.length === 0) {
      return [];
    }

    return (rows as ActionType[]).map((row) => ({
      actionTypeId: row.actionTypeId,
      name: row.name,
    }));
  };
  getById = (id: number): ActionType | null => {
    const stmt = this.db.prepare(`
                SELECT 
                    action_type_id as actionTypeId, 
                    name
                FROM action_types
                WHERE action_type_id = ?;
            `);

    const row = stmt.get(id) as ActionType;

    if (!row) {
      return null;
    }

    return {
      actionTypeId: row.actionTypeId,
      name: row.name,
    };
  };
  delete = (id: number): boolean => {
    const stmt = this.db.prepare(`
            DELETE FROM action_types
            WHERE action_type_id = ?;
        `);

    const info = stmt.run(id);

    if (info.changes > 0) {
      return true;
    } else {
      console.error("Error deleting action type");
      return false;
    }
  };
  update = (id: number, entity: Partial<ActionType>): boolean => {
    const fieldsToUpdate = [];
    const values = [];
    if (entity.name) {
      fieldsToUpdate.push("name = ?");
      values.push(entity.name);
    }

    if (fieldsToUpdate.length === 0) {
      console.error("No fields to update");
      return false;
    }
    const stmt = this.db.prepare(`
            UPDATE action_types
            SET ${fieldsToUpdate.join(", ")}
            WHERE action_type_id = ?;
        `);
    const info = stmt.run(...values, id);
    if (info.changes > 0) {
      return true;
    } else {
      console.error("Error updating action type");
      return false;
    }
  };
}
