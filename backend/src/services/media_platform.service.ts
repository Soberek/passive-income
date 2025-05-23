import { ServiceI } from "../types/index.type";
import { MediaPlatform } from "../../../shared/types";
import { MediaPlatformRepository } from "../repositories/media_platform.repository";
import { z } from "zod";

const mediaPlatformSchema = z.object({
  mediaPlatformId: z.number().min(1).optional(),
  name: z.string().min(2).max(100),
});
export class MediaPlatformService implements ServiceI<MediaPlatform, "mediaPlatformId"> {
  private mediaPlatformRepository: MediaPlatformRepository;

  constructor(mediaPlatformRepository: MediaPlatformRepository) {
    this.mediaPlatformRepository = mediaPlatformRepository;
  }

  add = (entity: Partial<MediaPlatform>): number | null => {
    const validation = mediaPlatformSchema.safeParse(entity);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    return this.mediaPlatformRepository.add(entity);
  };

  getAll = (): MediaPlatform[] => {
    return this.mediaPlatformRepository.getAll();
  };

  getById = (id: MediaPlatform["mediaPlatformId"]): MediaPlatform | null => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid media platform ID " + JSON.stringify(validation.error.issues));
    }
    return this.mediaPlatformRepository.getById(id);
  };

  delete = (id: MediaPlatform["mediaPlatformId"]): boolean => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid media platform ID " + JSON.stringify(validation.error.issues));
    }
    return this.mediaPlatformRepository.delete(id);
  };

  update = (id: MediaPlatform["mediaPlatformId"], entity: Partial<MediaPlatform>): boolean => {
    const validation = z.number().min(1).safeParse(id);
    const entityValidation = mediaPlatformSchema.partial().safeParse(entity);
    if (!entityValidation.success) {
      const errors = entityValidation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }

    if (!validation.success) {
      throw new Error("Invalid media platform ID " + JSON.stringify(validation.error.issues));
    }
    return this.mediaPlatformRepository.update(id, entity);
  };
}
