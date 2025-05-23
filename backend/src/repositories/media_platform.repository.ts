import sqliteDbService from "../services/sqliteDbService";
import { RepositoryI } from "../types/index.type";
import { MediaPlatform } from "../../../shared/types";

export class MediaPlatformRepository implements RepositoryI<MediaPlatform, "mediaPlatformId"> {
  private db: sqliteDbService;
  constructor(sqliteDbService: sqliteDbService) {
    this.db = sqliteDbService;
  }

  add = (entity: Partial<MediaPlatform>): number | null => {
    const stmt = this.db.prepare(`
            INSERT INTO media_platforms (name)
            VALUES (?);
        `);

    const info = stmt.run(entity.name);

    if (info.lastInsertRowid) {
      return Number(info.lastInsertRowid);
    } else {
      console.error("Error inserting media platform");
      return null;
    }
  };

  getAll = (): MediaPlatform[] => {
    const stmt = this.db.prepare(`
            SELECT 
                media_platform_id as mediaPlatformId, 
                name
            FROM media_platforms
        `);

    const rows = stmt.all();

    if (!rows || rows.length === 0) {
      return [];
    }

    return (rows as MediaPlatform[]).map((row) => ({
      mediaPlatformId: row.mediaPlatformId,
      name: row.name,
    }));
  };

  getById = (id: MediaPlatform["mediaPlatformId"]): MediaPlatform | null => {
    const stmt = this.db.prepare(`
                SELECT 
                    media_platform_id as mediaPlatformId, 
                    name
                FROM media_platforms
                WHERE media_platform_id = ?;
            `);

    const row = stmt.get(id) as MediaPlatform;

    if (!row) {
      return null;
    }

    return {
      mediaPlatformId: row.mediaPlatformId,
      name: row.name,
    };
  };

  update = (id: MediaPlatform["mediaPlatformId"], entity: Partial<MediaPlatform>): boolean => {
    const fieldsToUpdate = [];
    const values = [];

    if (entity.name) {
      fieldsToUpdate.push("name = ?");
      values.push(entity.name);
    }
    if (entity.mediaPlatformId) {
      fieldsToUpdate.push("media_platform_id = ?");
      values.push(entity.mediaPlatformId);
    }
    if (fieldsToUpdate.length === 0) {
      console.error("No fields to update");
      return false;
    }
    const stmt = this.db.prepare(`
            UPDATE media_platforms
            SET ${fieldsToUpdate.join(", ")}
            WHERE media_platform_id = ?;
        `);

    const info = stmt.run(...values, id);

    if (info.changes > 0) {
      return true;
    } else {
      console.error("Error updating media platform");
      return false;
    }
  };

  delete = (id: MediaPlatform["mediaPlatformId"]): boolean => {
    const stmt = this.db.prepare(`
            DELETE FROM media_platforms
            WHERE media_platform_id = ?;
        `);

    const info = stmt.run(id);

    if (info.changes > 0) {
      return true;
    } else {
      console.error("Error deleting media platform");
      return false;
    }
  };
}
