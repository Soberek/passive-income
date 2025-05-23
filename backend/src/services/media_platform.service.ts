import { ServiceI } from "../types/index.type";
import { MediaPlatform } from "../../../shared/types";
import { MediaPlatformRepository } from "../repositories/media_platform.repository";

class MediaPlatformService implements ServiceI<MediaPlatform, "mediaPlatformId"> {
  private mediaPlatformRepository: MediaPlatformRepository;

  constructor(mediaPlatformRepository: MediaPlatformRepository) {
    this.mediaPlatformRepository = mediaPlatformRepository;
  }

  add = (entity: Partial<MediaPlatform>): number | null => {
    return this.mediaPlatformRepository.add(entity);
  };

  getAll = (): MediaPlatform[] => {
    return this.mediaPlatformRepository.getAll();
  };

  getById = (id: MediaPlatform["mediaPlatformId"]): MediaPlatform | null => {
    return this.mediaPlatformRepository.getById(id);
  };

  delete = (id: MediaPlatform["mediaPlatformId"]): boolean => {
    return this.mediaPlatformRepository.delete(id);
  };

  update = (id: MediaPlatform["mediaPlatformId"], entity: Partial<MediaPlatform>): boolean => {
    return this.mediaPlatformRepository.update(id, entity);
  };
}
