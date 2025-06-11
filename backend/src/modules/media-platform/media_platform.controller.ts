import { MediaPlatformService } from "./media_platform.service";
import { Request, Response } from "express";

export class MediaPlatformController {
  constructor(private mediaPlatformService: MediaPlatformService) {}

  getAllMediaPlatforms = (_req: Request, res: Response) => {
    try {
      const mediaPlatforms = this.mediaPlatformService.getAll();
      res.status(200).json({ data: mediaPlatforms });
    } catch (error) {
      res.status(500).json({ error: "Error fetching media platforms" });
    }
  };

  getMediaPlatformById = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const mediaPlatform = this.mediaPlatformService.getById(Number(id));
      if (!mediaPlatform) {
        res.status(404).json({ error: "Media platform not found" });
        return;
      }
      res.status(200).json({ data: mediaPlatform });
    } catch (error) {
      res.status(500).json({ error: "Error fetching media platform" });
    }
  };

  addMediaPlatform = (req: Request, res: Response) => {
    const mediaPlatformData = req.body;
    try {
      const mediaPlatformId = this.mediaPlatformService.add(mediaPlatformData);
      res.status(201).json({ data: mediaPlatformId });
    } catch (error) {
      res.status(500).json({ error: "Error adding media platform" });
    }
  };
  updateMediaPlatform = (req: Request, res: Response) => {
    const { id } = req.params;
    const mediaPlatformData = req.body;
    try {
      const updated = this.mediaPlatformService.update(Number(id), mediaPlatformData);
      if (!updated) {
        res.status(404).json({ error: "Media platform not found" });
        return;
      }
      res.status(200).json({ message: "Media platform updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error updating media platform" });
    }
  };
  deleteMediaPlatform = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = this.mediaPlatformService.delete(Number(id));
      if (!deleted) {
        res.status(404).json({ error: "Media platform not found" });
        return;
      }
      res.status(200).json({ message: "Media platform deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting media platform" });
    }
  };
}
