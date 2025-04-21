import { Request, Response } from "express";
import { InstitutionsService } from "../services/institutionsService";
import SchoolService from "../services/schoolService";

export default class schoolController {
  private schoolService: SchoolService;
  private institutionsService: InstitutionsService;

  constructor() {
    this.schoolService = new SchoolService();
    this.institutionsService = new InstitutionsService();
  }

  getAllSchools(_: Request, res: Response): void {
    try {
      const schools = this.schoolService.getAllSchools();
      if (!schools) {
        res.status(404).json({ message: "No schools found" });
        return;
      }
      res.status(200).json(schools);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching schools" });
      return;
    }
  }

  createSchool(req: Request, res: Response): void {
    try {
      const {
        name,
        address,
        postal_code,
        city,
        phone,
        email,
        website,
        municipality,
        director,
      } = req.body;
      if (!name || !address || !postal_code || !city) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      // 1. Step 1: Create institution
      const newInstitution = this.institutionsService.addInstitution(
        name,
        address,
        postal_code,
        city,
        phone,
        email,
        website,
        municipality
      );

      if (!newInstitution) {
        res.status(500).json({ message: "Error creating institution" });
        return;
      }

      // 2. Step 2: Create school, pass institutionId from the new institution
      if (!director || director.trim() === "") {
        res.status(400).json({ message: "Missing director field" });
        return;
      }

      const newSchool = this.schoolService.addSchool(
        newInstitution.newInstitutionId,
        director
      );

      if (!newSchool) {
        res.status(500).json({ message: "Error creating school" });
        return;
      }

      // 3. Step 3: Return the new school with success message
      res.status(201).json({
        message: "School created successfully",
        newSchoolId: newSchool,
        newInstitutionId: newInstitution.newInstitutionId,
      });

      return;
    } catch (error) {
      res.status(500).json({ message: "Error creating school" });
      return;
    }
  }

  deleteSchool() {}

  // Add more methods as needed
}
