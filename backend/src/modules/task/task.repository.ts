import type {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../../types/index.type";
import SqliteDbService from "../../database/sqlite_db.service";

// CREATE TABLE tasks (
//   task_id INTEGER PRIMARY KEY AUTOINCREMENT,
//   reference_number TEXT NOT NULL UNIQUE,
//   task_number TEXT UNIQUE,
//   institution_id INTEGER NOT NULL,
//   program_id INTEGER NOT NULL,
//   action_type_id INTEGER NOT NULL,
//   description TEXT,
//   date DATE,
//   actions_count INTEGER,
//   audience_count INTEGER,
//   media_platform_id INTEGER, -- will be used if the task is a media publication
//   created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
//   FOREIGN KEY (program_id) REFERENCES programs(program_id),
//   FOREIGN KEY (action_type_id) REFERENCES action_types(action_type_id),
//   FOREIGN KEY (media_platform_id) REFERENCES media_platforms(media_platform_id)
// );

import type { Task, TaskCreateType, TaskUpdateSchema } from "./task.schema";
import { DatabaseI } from "../../types/database.type";
import sqlite from "better-sqlite3";
export class TaskRepository
  implements
    CreatableIRepositoryI<Task, "taskId">,
    ReadableRepositoryI<Task, "taskId">,
    UpdatableRepositoryI<Task, "taskId">,
    DeletableRepositoryI<Task, "taskId">
{
  constructor(private db: DatabaseI<sqlite.Database>) {}

  add = (entity: TaskCreateType): number | null => {
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

    const stmt = this.db.getDb().prepare(`
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
      return Number(result.lastInsertRowid);
    }
    return null;
  };

  getAll = (): Task[] => {
    const stmt = this.db.getDb().prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
      FROM tasks
    `);

    if (!stmt || !stmt.all || !Array.isArray(stmt.all())) {
      console.error("Failed to getDb().prepare statement or execute query");
      return [];
    }

    const result = (stmt.all() as Task[]) || [];
    if (!result || result.length === 0) {
      console.error("Failed to execute query or no results found");
      return [];
    }
    return result;
  };

  getById = (id: Task["taskId"]): Task | null => {
    const stmt = this.db.getDb().prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
      FROM tasks
      WHERE task_id = ?
    `);
    const result = stmt.get(id) as Task | null;
    if (!result) {
      console.error(`Failed to execute query or no results found for id: ${id}`);
      return null;
    }
    return result;
  };

  delete = (id: Task["taskId"]): boolean => {
    const stmt = this.db.getDb().prepare(`
      DELETE FROM tasks WHERE task_id = ?
    `);
    const result = stmt.run(id);
    return result.changes > 0;
  };

  update = (id: Task["taskId"], entity: Partial<Task>): boolean => {
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

    const stmt = this.db.getDb().prepare(`
      UPDATE tasks
      SET ${fieldsToUpdate.join(", ")}
      WHERE task_id = ?
    `);

    values.push(id);

    const result = stmt.run(...values);
    return result.changes > 0;
  };

  getByMonthAndYear = (month: number, year: number): Task[] => {
    const stmt = this.db.getDb().prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
      FROM tasks
      WHERE strftime('%m', date) = ? AND strftime('%Y', date) = ?
    `);
    const result = stmt.all(month.toString().padStart(2, "0"), year.toString()) as Task[] | undefined;
    if (!result) {
      console.error(`Failed to execute query or no results found for month: ${month}, year: ${year}`);
      return [];
    }
    return result;
  };

  getByFromMonthToMonthAndYear = (fromMonth: number, toMonth: number, year: number): Task[] => {
    const stmt = this.db.getDb().prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
        FROM tasks
        WHERE strftime('%Y', date) = ? AND strftime('%m', date) BETWEEN ? AND ?
    `);
    const result = stmt.all(
      year.toString(),
      fromMonth.toString().padStart(2, "0"),
      toMonth.toString().padStart(2, "0")
    ) as Task[] | undefined;
    if (!result) {
      console.error(
        `Failed to execute query or no results found for year: ${year}, fromMonth: ${fromMonth}, toMonth: ${toMonth}`
      );
      return [];
    }
    return result;
  };

  getAllTasksThatHaveMediaPlatform = (): Task[] => {
    const stmt = this.db.getDb().prepare(`
      SELECT task_id as taskId, reference_number as referenceNumber, task_number as taskNumber, institution_id as institutionId, program_id as programId, action_type_id as actionTypeId, description, date, actions_count as actionsCount, audience_count as audienceCount, media_platform_id as mediaPlatformId
      FROM tasks
      WHERE media_platform_id IS NOT NULL
    `);
    const result = stmt.all() as Task[] | undefined;
    if (!result) {
      console.error(`Failed to execute query or no results found`);
      return [];
    }
    return result;
  };
}
