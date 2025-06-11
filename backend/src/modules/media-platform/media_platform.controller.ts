import { AppError } from "../../handlers/error.handler";
import { MediaPlatformService } from "./media_platform.service";
import { NextFunction, Request, Response } from "express";

export class MediaPlatformController {
  constructor(private mediaPlatformService: MediaPlatformService) {}

  getAllMediaPlatforms = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const mediaPlatforms = this.mediaPlatformService.getAll();
      res.status(200).json({ data: mediaPlatforms });
    } catch (error) {
      next(new AppError("Error fetching media platforms", 500));
      return;
    }
  };

  getMediaPlatformById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const mediaPlatform = this.mediaPlatformService.getById(Number(id));
      if (!mediaPlatform) {
        next(new AppError("Media platform not found", 404));
        return;
      }
      res.status(200).json({ data: mediaPlatform });
    } catch (error) {
      next(new AppError("Error fetching media platform", 500));
      return;
    }
  };

  addMediaPlatform = (req: Request, res: Response, next: NextFunction) => {
    const mediaPlatformData = req.body;
    try {
      const mediaPlatformId = this.mediaPlatformService.add(mediaPlatformData);
      res.status(201).json({ data: mediaPlatformId });
    } catch (error) {
      next(new AppError("Error adding media platform", 500));
    }
  };
  updateMediaPlatform = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const mediaPlatformData = req.body;
    try {
      const updated = this.mediaPlatformService.update(Number(id), mediaPlatformData);
      if (!updated) {
        next(new AppError("Media platform not found", 404));
        return;
      }
      res.status(200).json({ message: "Media platform updated successfully" });
    } catch (error) {
      next(new AppError("Error updating media platform", 500));
    }
  };
  deleteMediaPlatform = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deleted = this.mediaPlatformService.delete(Number(id));
      if (!deleted) {
        next(new AppError("Media platform not found", 404));
        return;
      }
      res.status(200).json({ message: "Media platform deleted successfully" });
    } catch (error) {
      next(new AppError("Error deleting media platform", 500));
      return;
    }
  };
}
