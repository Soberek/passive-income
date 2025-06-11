import { NextFunction, Request, Response } from "express";
import SchoolService from "./school.service";
import { AppError } from "../../handlers/error.handler";

import type { Institution, School } from "../../../../shared/types";

export default class schoolController {
  constructor(private schoolService: SchoolService) {
    this.schoolService = schoolService;
  }

  getAllSchools = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const schools = this.schoolService.getAllSchools();

      res.status(200).json({
        data: schools,
      });
      return;
    } catch (error) {
      next(new AppError("Error fetching schools", 500));
      return;
    }
  };

  createSchool = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        name,
        address,
        postalCode,
        city,
        phone,
        email,
        municipality,
        director,
      }: Omit<Institution, "institutionId"> & Omit<School, "schoolId"> = req.body;
      if (!name || !address || !postalCode || !city) {
        next(new AppError("Missing required fields", 400));
        return;
      }

      // 1. Step 1: Create institution

      const newInstitutionSchool = await this.schoolService.addInstitutionSchool({
        name,
        address,
        postalCode,
        city,
        phone,
        email,
        municipality,
        director,
      });

      if (!newInstitutionSchool.institutionId || newInstitutionSchool.schoolId === -1) {
        {
          next(new AppError("Error creating school institution", 500));
          return;
        }
      }

      // Check if the new school was created successfully
      res.status(201).json({
        message: "School created successfully",
        institutionId: newInstitutionSchool.institutionId,
        schoolId: newInstitutionSchool.schoolId,
      });

      // 3. Step 3: Return the new school with success message

      return;
    } catch (error) {
      next(new AppError("Error creating school", 500));
      return;
    }
  };

  deleteSchool = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    console.log("Deleting school with ID: ", id);
    try {
      if (!id) {
        next(new AppError("Missing school ID", 400));
        return;
      }
      const deletedSchool = this.schoolService.deleteSchool(parseInt(id));

      if (!deletedSchool) {
        next(new AppError("School not found", 404));
        return;
      }
      res.status(200).json({ message: "School deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      next(new AppError("Error deleting school", 500));
      return;
    }
  };

  getSchoolById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Fetching school by ID");
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        next(new AppError("Invalid or missing school ID", 400));
        return;
      }

      const school = this.schoolService.getSchoolById(parseInt(id));

      if (!school) {
        next(new AppError("School not found", 404));
        return;
      }

      res
        .status(200)
        .json({ data: { schoolId: school.schoolId, institutionId: school.institutionId, director: school.director } });
      return;
    } catch (error) {
      next(new AppError("Error fetching school", 500));
      return;
    }
  };

  updateSchool = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { institutionId, director }: { institutionId: string | undefined; director: string | undefined } = req.body;
      if (!id) {
        next(new AppError("Missing required fields", 400));
        return;
      }

      const updatedSchool = this.schoolService.updateSchool(parseInt(id), {
        institutionId: institutionId ? parseInt(institutionId) : undefined,
        director,
      });
      if (!updatedSchool) {
        next(new AppError("School not found", 404));
        return;
      }
      res.status(200).json({ message: "School updated successfully" });
      return;
    } catch (error) {
      next(new AppError("Error updating school", 500));
      return;
    }
  };

  getSchoolByInstitutionId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Fetching school by institution ID");
    try {
      const { institutionId } = req.params;
      if (!institutionId) {
        next(new AppError("Missing institution ID", 400));
        return;
      }
      const school = this.schoolService.getSchoolByInstitutionId(parseInt(institutionId));
      if (!school) {
        next(new AppError("School not found", 404));
        return;
      }
      res.status(200).json(school);
      return;
    } catch (error) {
      next(new AppError("Error fetching school", 500));
      return;
    }
  };
}
