import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../../types/index.type";
import { MediaPlatform } from "../../../../shared/types";
import { MediaPlatformRepository } from "../media-platform/media_platform.repository";
import { mediaPlatformSchema, mediaPlatformCreateSchema, mediaPlatformUpdateSchema } from "./media_platform.schema";

export class MediaPlatformService
  implements
    CreatableServiceI<MediaPlatform, "mediaPlatformId">,
    DeletableServiceI<MediaPlatform, "mediaPlatformId">,
    UpdatableServiceI<MediaPlatform, "mediaPlatformId">,
    ReadableServiceI<MediaPlatform, "mediaPlatformId">
{
  private mediaPlatformRepository: MediaPlatformRepository;

  constructor(mediaPlatformRepository: MediaPlatformRepository) {
    this.mediaPlatformRepository = mediaPlatformRepository;
  }

  add = (entity: Partial<MediaPlatform>): number | null => {
    const validation = mediaPlatformCreateSchema.safeParse(entity);
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
    const validation = mediaPlatformSchema.shape.mediaPlatformId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid media platform ID " + JSON.stringify(validation.error.issues));
    }
    return this.mediaPlatformRepository.getById(id);
  };

  delete = (id: MediaPlatform["mediaPlatformId"]): boolean => {
    const validation = mediaPlatformSchema.shape.mediaPlatformId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid media platform ID " + JSON.stringify(validation.error.issues));
    }
    return this.mediaPlatformRepository.delete(id);
  };

  update = (id: MediaPlatform["mediaPlatformId"], entity: Partial<MediaPlatform>): boolean => {
    const validation = mediaPlatformUpdateSchema.safeParse(entity);
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
