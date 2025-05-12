import { Request, Response } from "express";
import { InstitutionsService } from "../services/institutions.service";
import SchoolService from "../services/school.service";

import { CreateSchoolDto, CreateSchoolWithInstitutionDto } from "../../../shared/types/index";

export default class schoolController {
  constructor(private schoolService: SchoolService, private institutionsService: InstitutionsService) {
    this.schoolService = schoolService;

    this.institutionsService = institutionsService;
  }

  getAllSchools = (_: Request, res: Response): void => {
    console.log("Fetching all schools");
    try {
      const schools = this.schoolService.getAllSchools();
      if (!schools) {
        res.status(404).json({ message: "No schools found" });
        return;
      }
      res.status(200).json(schools);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching schools", error });
      return;
    }
  };

  createSchool = (req: Request, res: Response): void => {
    console.log("Creating school");
    try {
      const { name, address, postalCode, city, phone, email, municipality, director }: CreateSchoolWithInstitutionDto =
        req.body;
      if (!name || !address || !postalCode || !city) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      // 1. Step 1: Create institution

      const newInstitutionSchool = this.schoolService.addInstitutionSchool({
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
          res.status(500).json({ message: "Error creating school institution" });
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
      res.status(500).json({ message: "Error creating school" });
      return;
    }
  };

  deleteSchool = (req: Request, res: Response): void => {
    const { id } = req.params;
    console.log("Deleting school with ID: ", id);
    try {
      if (!id) {
        res.status(400).json({ message: "Missing school ID" });
        return;
      }
      const deletedSchool = this.schoolService.deleteSchool(parseInt(id));

      if (!deletedSchool) {
        res.status(404).json({ message: "School not found" });
        return;
      }
      res.status(200).json({ message: "School deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting school", error: String(error) });
      return;
    }
  };

  getSchoolById = (req: Request, res: Response): void => {
    console.log("Fetching school by ID");
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Missing school ID" });
        return;
      }
      const school = this.schoolService.getSchoolById(parseInt(id));
      if (!school) {
        res.status(404).json({ message: "School not found" });
        return;
      }
      res.status(200).json(school);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching school" });
      return;
    }
  };

  updateSchool = (req: Request, res: Response): void => {
    console.log("Updating school");
    try {
      const { id } = req.params;
      const { institutionId, director }: CreateSchoolDto = req.body;
      if (!id || !institutionId || !director) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const updatedSchool = this.schoolService.updateSchool(parseInt(id), parseInt(institutionId.toString()), director);
      if (!updatedSchool) {
        res.status(404).json({ message: "School not found" });
        return;
      }
      res.status(200).json({ message: "School updated successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error updating school", error });
      return;
    }
  };

  getSchoolByInstitutionId = (req: Request, res: Response): void => {
    console.log("Fetching school by institution ID");
    try {
      const { institutionId } = req.params;
      if (!institutionId) {
        res.status(400).json({ message: "Missing institution ID" });
        return;
      }
      const school = this.schoolService.getSchoolByInstitutionId(parseInt(institutionId));
      if (!school) {
        res.status(404).json({ message: "School not found" });
        return;
      }
      res.status(200).json(school);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching school", error });
      return;
    }
  };
}
