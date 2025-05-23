import { Task } from "../../../shared/types";
import { RepositoryI } from "../types/index.type";
import sqliteDbService from "../services/sqliteDbService";

export class TaskRepository implements RepositoryI<Task, "taskId"> {
  private db: sqliteDbService;

  constructor(db: sqliteDbService) {
    this.db = db;
  }

  add = (entity: Partial<Task>): number | BigInt | null => {
    const {
      referenceNumber,
      taskNumber,
      institutionId,
      programId,
      actionTypeId,
      description,
      date,
      actionsCount,
      audienceCount,
      mediaPlatformId,
    } = entity;

    const stmt = this.db.prepare(`
      INSERT INTO tasks (
        reference_number, task_number, institution_id, program_id, action_type_id, description, date, actions_count, audience_count, media_platform_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      referenceNumber,
      taskNumber,
      institutionId,
      programId,
      actionTypeId,
      description,
      date,
      actionsCount,
      audienceCount,
      mediaPlatformId
    );

    if (result.changes > 0) {
      return result.lastInsertRowid;
    }
    return null;
  };

  getAll = (): Task[] => {
    const stmt = this.db.prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
      FROM tasks
    `);

    if (!stmt || !stmt.all) {
      console.error("Failed to prepare statement or execute query");
      return [];
    }

    const result = (stmt.all() as Task[]) || [];
    if (!result || result.length === 0) {
      console.error("Failed to execute query or no results found");
      return [];
    }
    return result;
  };

  getById = (id: number | BigInt): Task | null => {
    const stmt = this.db.prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
      FROM tasks
      WHERE task_id = ?
    `);
    const result = stmt.get(id) as Task | undefined;
    if (!result) {
      console.error(`Failed to execute query or no results found for id: ${id}`);
      return null;
    }
    return result;
  };

  delete = (id: number | BigInt): boolean => {
    const stmt = this.db.prepare(`
      DELETE FROM tasks WHERE task_id = ?
    `);
    const result = stmt.run(id);
    return result.changes > 0;
  };

  update = (id: number | BigInt, entity: Partial<Task>): boolean => {
    const values = [];
    const fieldsToUpdate = [];

    if (entity.referenceNumber !== undefined) {
      fieldsToUpdate.push("reference_number = ?");
      values.push(entity.referenceNumber);
    }
    if (entity.taskNumber !== undefined) {
      fieldsToUpdate.push("task_number = ?");
      values.push(entity.taskNumber);
    }
    if (entity.institutionId !== undefined) {
      fieldsToUpdate.push("institution_id = ?");
      values.push(entity.institutionId);
    }
    if (entity.programId !== undefined) {
      fieldsToUpdate.push("program_id = ?");
      values.push(entity.programId);
    }
    if (entity.actionTypeId !== undefined) {
      fieldsToUpdate.push("action_type_id = ?");
      values.push(entity.actionTypeId);
    }
    if (entity.description !== undefined) {
      fieldsToUpdate.push("description = ?");
      values.push(entity.description);
    }
    if (entity.date !== undefined) {
      fieldsToUpdate.push("date = ?");
      values.push(entity.date);
    }
    if (entity.actionsCount !== undefined) {
      fieldsToUpdate.push("actions_count = ?");
      values.push(entity.actionsCount);
    }
    if (entity.audienceCount !== undefined) {
      fieldsToUpdate.push("audience_count = ?");
      values.push(entity.audienceCount);
    }
    if (entity.mediaPlatformId !== undefined) {
      fieldsToUpdate.push("media_platform_id = ?");
      values.push(entity.mediaPlatformId);
    }

    if (fieldsToUpdate.length === 0) {
      return false;
    }

    const stmt = this.db.prepare(`
      UPDATE tasks
      SET ${fieldsToUpdate.join(", ")}
      WHERE task_id = ?
    `);

    values.push(id);

    const result = stmt.run(...values);
    return result.changes > 0;
  };
}
