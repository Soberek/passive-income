import { Request, Response } from "express";
import { SchoolProgramParticipationService } from "../services/school_program_participation.service";

export class SchoolProgramParticipationController {
  constructor(private schoolProgramParticipationService: SchoolProgramParticipationService) {}

  addSchoolProgramParticipation = (req: Request, res: Response): void => {
    const { schoolId, programId, schoolYearId } = req.body;
    console.log(req.body);
    console.log(schoolId, programId, schoolYearId);
    const result = this.schoolProgramParticipationService.addSchoolProgramParticipation(
      schoolId,
      programId,
      schoolYearId
    );
    if (result) {
      res.status(201).send("School program participation added successfully");
    } else {
      res.status(400).send("Error adding school program participation");
    }
  };
}
